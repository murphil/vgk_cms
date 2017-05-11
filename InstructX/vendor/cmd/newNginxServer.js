let {Instructs} = require('../index')
let {loggerFactory} = require('../utils/logger')
let {loadYaml} = require('../utils/loadYaml')
let path = require('path')
let LOGFILE = require('../utils/logfile')

let NginxConf = (server, serverName, serverPort) => `upstream node{
  ${server.map(x => `server ${x};`).join('\n')}
}

server {
  listen ${serverPort};
  server_name ${serverName.join(' ')};

  location / {
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_redirect   off;
    proxy_buffering  on;
    proxy_pass       http://node;
  }
  
}
`

module.exports = function (conf, location, confDir) {
  const confFile = loadYaml(path.join('.', confDir, 'account', `nginxConf_${conf}.yml`))
  const {server, server_port, server_name} = confFile
  let target = path.join(location || '.', `${conf}.conf`)
  let logger = loggerFactory({
    location: LOGFILE,
    section: `新建Nginx服务器配置文件${target}`
  })
  Instructs(logger)
    .newFile({
      name: 'server',
      target,
      payload: NginxConf(server, server_name, server_port) })
    .hintCmd({
      name: '已生成配置文件',
      cmd: '拷贝至Nginx相应目录',
      purpose: '生成配置文件'
    })
    .run()

}