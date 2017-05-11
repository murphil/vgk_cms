let {Instructs} = require('./vendor/index')
let {loggerFactory} = require('./vendor/utils/logger')
let {loadYaml} = require('../utils/yml')
let DB = require('../server/database/const.yml.json').SCHEMA
let DatabaseOP = require('./OpDatabase')
let path = require('path')
let LOGFILE = require('./vendor/utils/logfile')

module.exports = function () {
  let contentDir = 'content'
  let logger = loggerFactory({
    location: LOGFILE,
    section: `数据库`
  })
  Instructs(logger)
    .appOperation(DatabaseOP)
    .updateContentBatch({
      name: 'x',
      target: contentDir,
      doEach: async (file, fullpath, logger, args, knex)  => {
        let paths = path.parse(fullpath).base.split('.')
        if (paths[paths.length - 1] === 'yml') {
          let name =  paths.slice(0, paths.length - 1)
          if (name.length === 2) {
            let cid = (await knex(DB.CONTENT.CATEGORY._)
              .select(DB.CONTENT.CATEGORY.ID)
              .where(DB.CONTENT.CATEGORY.URI, name[0]))[0][DB.CONTENT.CATEGORY.ID]
            await knex(DB.CONTENT.ARTICLE._).update(DB.CONTENT.ARTICLE.CONTENT, loadYaml(fullpath))
              .where(DB.CONTENT.ARTICLE.CID, cid)
              .andWhere(DB.CONTENT.ARTICLE.URI, name[1])
            logger.detail(...args, `更新${name[0]}栏目中的${name[1]}`)
          } else if(name.length === 1) {
            await knex(DB.CONTENT.CATEGORY._).update(DB.CONTENT.CATEGORY.CONTENT, loadYaml(fullpath))
              .where(DB.CONTENT.CATEGORY.URI, name[0])
            logger.detail(...args, `更新${name[0]}栏目`)
          }
        }
      }
    })
    .run()

}