const { client
  , host
  , port
  , user
  , password
  , database
} = require('./db_account_info.yml.json')

module.exports = require('knex')({
  client: client,
  /*
   pool: {
   min: 3,
   max: 10
   },
   */
  connection: `tcp://${user}:${password}@${host}:${port}/${database}`
})

