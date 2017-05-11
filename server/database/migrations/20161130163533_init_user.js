let _ = require('../const.yml.json').SCHEMA.USER

exports.up = async function (knex, Promise) {

  await knex.schema.createTableIfNotExists(_.GROUP._, (table) => {
    table.increments(_.GROUP.ID)
    table.integer(_.GROUP.PID).references(`${_.GROUP._}.${_.GROUP.ID}`)
    table.string(_.GROUP.NAME)
    table.string(_.GROUP.COMMENT)
  })

  await  knex.schema.createTableIfNotExists(_.USER._, (table) => {
    table.increments(_.USER.ID)
    table.integer(_.USER.GID).references(`${_.GROUP._}.${_.GROUP.ID}`)
    table.string(_.USER.ACCOUNT).unique().notNullable().index()
    table.string(_.USER.NAME).unique().index()
    table.string(_.USER.PASSWORD)
    table.timestamp(_.USER.BAN)
    table.timestamps()
    table.jsonb(_.USER.ATTR)
  })

  await knex.schema.createTableIfNotExists(_.ROLE._, (table) => {
    table.increments(_.ROLE.ID)
    table.string(_.ROLE.NAME).unique().notNullable().index()
    table.string(_.ROLE.COMMENT)
  })

  await knex.schema.createTableIfNotExists(_.USER_ROLE._, (table) => {
    table.integer(_.USER_ROLE.UID).references(`${_.USER._}.${_.USER.ID}`)
    table.integer(_.USER_ROLE.RID).references(`${_.ROLE._}.${_.ROLE.ID}`)
  })

  await knex.schema.createTableIfNotExists(_.POWER._, (table) => {
    table.increments(_.POWER.ID)
    table.string(_.POWER.NAME).unique().notNullable().index()
    table.string(_.POWER.COMMENT)
  })

  await knex.schema.createTableIfNotExists(_.ROLE_POWER._, (table) => {
    table.integer(_.ROLE_POWER.RID).references(`${_.ROLE._}.${_.ROLE.ID}`)
    table.integer(_.ROLE_POWER.PID).references(`${_.POWER._}.${_.POWER.ID}`)
  })


};

exports.down = async function (knex, Promise) {

  await knex.schema.dropTableIfExists(_.ROLE_POWER._)
  await knex.schema.dropTableIfExists(_.POWER._)
  await knex.schema.dropTableIfExists(_.USER_ROLE._)
  await knex.schema.dropTableIfExists(_.ROLE._)
  await knex.schema.dropTableIfExists(_.USER._)
  await knex.schema.dropTableIfExists(_.GROUP._)

};




