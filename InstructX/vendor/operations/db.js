let D = require('../server/database/const.json').SCHEMA

module.exports = {
  updateContent : {
    tag: '更新数据表',
    resolve: async (i, logger, cmd) => {
      let knex = require('../server/database/knexConnection')
      logger.log(cmd, i.target, i.name)
      await knex(i.target).update(i.payload).where('uri', i.uri)
      return knex
    },
    after: async (i, logger, cmd, knex) => {
      //process.exit()
    }
  }
}