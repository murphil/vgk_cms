let { client
    , database
    , user
    , password
    } = require("./db_account_info.yml.json")

module.exports = {

  development: {
    client,
    connection: {
      database,
      user,
      password
    }
  },

  staging: {
    client,
    connection: {
      database,
      user,
      password,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client,
    connection: {
      database,
      user,
      password,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
