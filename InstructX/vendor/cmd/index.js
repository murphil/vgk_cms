let program = require('commander')
let test = require('./test')
let y2j = require('./yml2json')
let sendMail = require('./sendMail')
let nnz = require('./newNginxZip')
let nns = require('./newNginxServer')

program
  .command('test <name>')
  .alias('t')
  .description('测试')
  .action(name => {
    test(name)
  })

program
  .command('yml2json <dir>')
  .alias('y')
  .description('将指定目录下的所有yml文件转为json文件')
  .action(dir => {
    y2j(dir)
  })

program
  .command('sendMail <file> [receiver...]')
  .alias('m')
  .description('发送邮件\n\t请在 operations/mailAccount.yml 填写发送账号，npm run x -- y . 使之生效\n\t  然后在 mail/xxx.yml 文件中填写发送内容，\n\t  使用 npm run x -- m xxx [接收者] 发送邮件')
  .action((file, receiver) => {
    sendMail(file, receiver)
  })

program
  .command('newNginxZipConf [location]')
  .alias('nnz')
  .description('新建Nginx传输压缩配置文件')
  .action(location => {
    nnz(location)
  })

program
  .command('newNginxServer <conf> [location]')
  .alias('nns')
  .description('根据指定配置新建Nginx的服务器配置文件')
  .action((conf, location) => {
    const confDir = require.main === module ? '.' : 'InstructX'
    nns(conf, location, confDir)
  })

if (require.main === module) {
  program.parse(process.argv)
}

module.exports = program

