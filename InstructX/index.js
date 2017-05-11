let program = require('./vendor/cmd/index')
let nl = require('./newLayout')
let nc = require('./newComponent')
let uc = require('./updateDBContent')

program
  .version('0.0.1')

program
  .command('newLayout <name>')
  .alias('nl')
  .description('新建Vue布局')
  .action(name => {
    nl(name)
  })

program
  .command('newComponent <name>')
  .alias('nc')
  .description('新建Vue组件')
  .action(name => {
    nc(name)
  })

program
  .command('updateContent')
  .alias('uc')
  .description('更新scaffold/content目录中定义的数据库内容')
  .action(() => {
    uc()
  })

program.parse(process.argv)