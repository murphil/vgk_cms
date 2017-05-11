let formidable = require('formidable')
let path = require('path')
let fs = require('fs')
let router = require('koa-router')
let K = require('./database/knexConnection')
let T = require('./database/const.yml.json').SCHEMA.RESOURCE.RESOURCE_EXT

let DIST = path.resolve(__dirname, '..', 'dist')
let UPLOADS = path.resolve(__dirname, '..', 'uploads')
let PRIVATE_UPLOADS = path.resolve(UPLOADS, 'private')
let PUBLIC_UPLOADS = path.resolve(UPLOADS, 'public')

let ext2ContentType = {}
let ext2Type = {}
K(T._).select(T.NAME, T.CTY, T.TYPE, T.ATTACH)
  .then(x => {
    for (let i of x) {
      ext2ContentType[i[T.NAME]] = {type:i[T.CTY], attachment:i[T.ATTACH]}
      ext2Type[i[T.NAME]] = i[T.TYPE]
    }
  })

let ResourceR = new router()

ResourceR.get('/static/:path+',
  async(ctx, next) => {
    let filePath = path.resolve(DIST, 'static', ctx.params.path)
    let baseName = path.basename(ctx.params.path)
    let ctype = ext2ContentType[path.extname(baseName).slice(1)] || {type: 'application/octet-stream', attachment: true}
    ctx.body = fs.createReadStream(filePath)
    ctx.set('Content-disposition', `${ctype.attachment ? 'attachment; ' : ''}filename=${encodeURI(baseName)}`)
    ctx.set('Content-type', ctype.type)
  }
)

ResourceR.get('/public/:type/:path*/:filename',
  async(ctx, next) => {
    let type = ctx.params.type
    let name = ctx.params.filename
    let dir = ctx.params.path || ''
    let filepath = path.resolve(PUBLIC_UPLOADS, type, dir ,name)
    // 不在列表中的类型直接下载
    let ctype = ext2ContentType[path.extname(name).slice(1)] || {type: 'application/octet-stream', attachment: true}
    ctx.body = fs.createReadStream(filepath)
    ctx.set('Content-disposition', `${ctype.attachment ? 'attachment; ' : ''}filename=${encodeURI(name)}`)
    ctx.set('Content-type', ctype.type)
  }
)

ResourceR.get('/private/:user/:filename',
  async(ctx, next) => {
    let user = ctx.params.user || 'root'
    let file = ctx.params.filename
    let attachment = false
    let filepath = path.resolve(PRIVATE_UPLOADS, 'logo.png') //TODO:
    ctx.body = fs.createReadStream(filepath)
    ctx.set('Content-disposition', `${attachment ? 'attachment; ' : ''}filename=${encodeURI('logo.png')}`)
    ctx.set('Content-type', 'image/png')
})

let parseForm = (req) => (dir) => {
  return new Promise(function (resolve, reject) {
    let form = new formidable.IncomingForm({uploadDir: dir || UPLOADS})
    form.parse(req, function(err, fields, files) {
      if (err) { reject(err) }
      resolve({files, fields})
    })
  })
}
ResourceR.post('/upload/:t',  async(ctx, next) => {
  /*
  公有文件，先根据类型到相应目录，然后放入用户目录；文件名为时间戳+扩展名。
      真实文件名由用户查找数据库提供；下载则无需查找数据库，只需要链接。
  私有文件，直接放入用户目录；文件名为Hash值。
      真实文件名要到数据库中查找；下载也要在数据库中验证权限。
   */
  let t = ctx.params.t
  if (t === 'a') {
    let res = await parseForm(ctx.req)()
  } else {
    let res = await parseForm(ctx.req)(path.join(PUBLIC_UPLOADS, 'other'))
  }
})

module.exports = ResourceR
