let path = require('path')
let fs = require('fs')
let moment = require('moment')
let {loggerFactory} = require('../utils/logger');
let {Instructs} = require('../index')
let {loadYaml} = require('../utils/loadYaml')
let LOGFILE = require('../utils/logfile')

module.exports = function (dir) {
  let logger = loggerFactory({
    location: LOGFILE,
    section: `yaml to json: ${dir}`
  })
  Instructs(logger)
    .walkDir({
      name: "y2j",
      target: dir,
      doEach: (file, fullPath, logger, args) => {
        let paths = path.parse(fullPath)
        let ex = paths.dir.split('/').indexOf('node_modules') < 0
        if (ex && /.*\.yml$/.test(file)) {
          //let name = paths.base.replace(/\.yml$/, '')
          paths.base += '.json'
          let jsonFilePath = path.format(paths)
          let c2, c1 = !fs.existsSync(jsonFilePath)
          if (!c1) {
            let yj = moment(fs.statSync(fullPath).mtime)
            let tj = moment(fs.statSync(jsonFilePath).mtime)
            c2 = tj.isBefore(yj)
          }
          if (c1 || c2) {
            let json = loadYaml(fullPath)
            fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, '  '))
            logger.detail(...args, `\t将'${fullPath}'转换为'${jsonFilePath}'`)
          }
        }
      }
    })
    .run()
}