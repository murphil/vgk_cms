const http = require('http')
const url = require('url')
const Koa = require('koa')
const app = new Koa()
const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')
const router = require('koa-router')
const proxy = require('http-proxy').createProxyServer({})
const logger = require('koa-logger')
//const convert = require('koa-convert')
const schema = require('./server/graphql')
const ResourceR = require('./server/resources')
const chalk = require('chalk')
const path = require('path'), fs = require('fs')

app.use(logger())
app.use(async(ctx, next) => {
  await next()
})

app.use(mount('/graphql', graphqlHTTP({
  schema,
  graphiql: true
})))


let apiR = new router()
let testR = new router()
testR.all('/test/:user', async(ctx, next) => {
  ctx.body = `Hello ${ctx.params.user}!`
  console.log(ctx.body)
})
apiR.use('/api', testR.routes(), testR.allowedMethods())
app.use(apiR.routes())

app.use(ResourceR.routes())

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  })
  res.end(err.toString())
})


if (process.env.NODE_ENV === 'product') {
  const PORT = 9999
  let rootR = new router()
  let DIST = path.resolve('dist')
  rootR.get('/', async(ctx, next) => {
    let indexPath = path.resolve(DIST, 'index.html')
    ctx.body = fs.createReadStream(indexPath)
    ctx.set('Content-type', 'text/html; charset=UTF-8')
  })
  app.use(rootR.routes())
  console.log(chalk.black.bgCyan(`Product server listening on ${PORT}`))
  app.listen(PORT)
} else {
  const PORT = 3333
  let appCB = app.callback()
  http.createServer((req, res) => {
    let path = url.parse(req.url).pathname
    let host = req.headers.host
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (/^(\/graphql|\/public|\/private|\/upload|\/api).*/.test(path)) {
      appCB(req, res)
    } else {
      proxy.web(req, res, {target: 'http://localhost:3030'})
    }
  }).listen(PORT)
}

require('./server/pg_notify')