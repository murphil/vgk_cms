let D = require('../server/database/const.yml.json').SCHEMA
let {walkDirSync} = require('./vendor/utils/walkDir')
let LOGFILE = require('./vendor/utils/logfile')

module.exports = {
  updateContent : {
    tag: '更新数据表',
    resolve: async (i, logger, tag) => {
      let knex = require('../server/database/knexConnection')
      logger.log(tag, i.target, i.name)
      await knex(i.target).update(i.payload).where('uri', i.uri)
      return knex
    },
    after: async (i, logger, tag, knex) => {
      //process.exit()
    }
  },
  updateContentBatch : {
    tag: '批量更新',
    resolve: async (i, logger, tag) => {
      let knex = require('../server/database/knexConnection')
      logger.log(tag, i.target, i.name)
      return walkDirSync(i.target, (file, fullpath) => i.doEach(file, fullpath, logger, [tag, i.target, i.name], knex))
    },
    after: async (i, logger, tag, knex) => {
      //process.exit()
    }
  }
}