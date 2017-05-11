let _ = require('../const.yml.json').SCHEMA.AD
let __ = require('../const.yml.json').SCHEMA.USER
exports.up = async function(knex, Promise) {
  await knex.schema.createTableIfNotExists(_.CATEGORY._, (t)=>{
    t.increments(_.CATEGORY.ID)
    t.integer(_.CATEGORY.PID)
    t.foreign(_.CATEGORY.PID).references(_.CATEGORY.ID).inTable(_.CATEGORY._)
    t.integer(_.CATEGORY.MT).references(__.USER.ID).inTable(__.USER._)
    t.string(_.CATEGORY.NAME).notNullable()
    t.string(_.CATEGORY.URI).unique().notNullable()
    t.integer(_.CATEGORY.WEIGHT).notNullable().defaultTo(1)
    t.jsonb(_.CATEGORY.CONTENT)
    t.boolean(_.CATEGORY.HID)
    t.timestamps()
    t.jsonb(_.CATEGORY.ATTR)
  })
  await knex.schema.createTableIfNotExists(_._._, (t)=>{
    t.increments(_._.ID)
    t.integer(_._.CID).references(_.CATEGORY.ID).inTable(_.CATEGORY._)
    t.integer(_._.OID).references(__.USER.ID).inTable(__.USER._)
    t.string(_._.TITLE)
    t.string(_._.URI).notNullable()
    t.jsonb(_._.CONTENT)
    t.boolean(_._.HID)
    t.timestamps()
    t.jsonb(_._.ATTR)
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists(_._._)
  await knex.schema.dropTableIfExists(_.CATEGORY._)
};
