let {loadYaml} = require('../utils/loadYaml')
let path = require('path')
let mailOP = require('../operations/mail')
let {loggerFactory} = require('../utils/logger')
let {Instructs} = require('../index')
let LOGFILE = require('../utils/logfile')

module.exports = function (file, receiver) {
  let logger = loggerFactory({
    location: LOGFILE,
    section: `发送邮件${file}`
  })
  let mail = loadYaml(path.resolve('InstructX','mail', file + '.yml'))
  Instructs(logger)
    .appOperation(mailOP)
    .sendMail({
      name: file+'.yml',
      target: receiver.length > 0 ? receiver : mail.to,
      mail
    })
    .run()
}
