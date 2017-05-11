let _ = require('../const.yml.json').SCHEMA.RESOURCE
let __ = require('../const.yml.json').SCHEMA.USER

exports.up = async function (knex, Promise) {


  await knex.schema.createTableIfNotExists(_.RESOURCE_EXT._, (table) => {
    table.increments(_.RESOURCE_EXT.ID)
    table.string(_.RESOURCE_EXT.NAME)
    table.string(_.RESOURCE_EXT.TYPE)
    table.string(_.RESOURCE_EXT.CTY)
    table.boolean(_.RESOURCE_EXT.ATTACH).defaultTo(true)
    table.string(_.RESOURCE_EXT.COMMENT)
  })


  await knex.schema.createTableIfNotExists(_.RESOURCE._, (table) => {
    table.increments(_.RESOURCE.ID)
    table.string(_.RESOURCE.NAME)
    table.integer(_.RESOURCE.EXT).references(`${_.RESOURCE_EXT._}.${_.RESOURCE_EXT.ID}`)
    table.string(_.RESOURCE.PATH)
    table.string(_.RESOURCE.FILE)
    table.integer(_.RESOURCE.OWNER).references(`${__.USER._}.${__.USER.ID}`)
    table.jsonb(_.RESOURCE.ATTR)
    table.integer(_.RESOURCE.MODE)

    table.unique([_.RESOURCE.NAME, _.RESOURCE.EXT, _.RESOURCE.OWNER])
    table.unique([_.RESOURCE.PATH, _.RESOURCE.FILE])
  })

};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTableIfExists(_.RESOURCE._)
  await knex.schema.dropTableIfExists(_.RESOURCE_EXT._)
};
