let path = require('path')
let {loggerFactory} = require('../utils/logger');
let {Instructs} = require('../index')
let LOGFILE = require('../utils/logfile')

module.exports = function (name) {
  let logger = loggerFactory({
    location: LOGFILE,
    section: `测试${name}`
  })
  Instructs(logger)
    .newDir({
      name:'文件夹',
      target:path.join('.', name) })
    .newFile({
      name: '文件',
      target: path.join('.', name, name) + '.txt',
      payload: 'this a test file' })
    .dealFile({
      name: '示例文件',
      target: path.join('.', name, name) + '.txt',
      payload: '已创建，请查看'})
    .run()
}
