let {Instructs} = require('../index')
let {loggerFactory} = require('../utils/logger')
let path = require('path')
let LOGFILE = require('../utils/logfile')

let NginxConf = () => `
gzip on;
gzip_disable "msie6";
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_http_version 1.1;
gzip_vary on;
# gzip_proxied any;
gzip_comp_level 2;
# gzip_buffers 16 8k;
gzip_types text/plain
           text/css
           application/json
           application/x-javascript
           text/xml
           application/xml
           application/xml+rss
           text/javascript;
`

module.exports = function (location) {
  let target = path.join(`${location || '.'}`, 'compress.conf')
  let logger = loggerFactory({
    location: LOGFILE,
    section: `新建Nginx传输压缩配置文件${location}`
  })
  Instructs(logger)
    .newFile({
      name: '传输压缩配置',
      target,
      payload: NginxConf() })
    .hintCmd({
      name: '已生成配置文件',
      cmd: '请拷贝至Nginx相应目录',
      purpose: '生成配置文件'
    })
    .run()

}