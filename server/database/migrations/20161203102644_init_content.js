let _ = require('../const.yml.json').SCHEMA.CONTENT
let __ = require('../const.yml.json').SCHEMA.USER

exports.up = async function (knex, Promise) {

  /*
  await knex.schema.createTableIfNotExists(_.COL_TYP._, (table) => {
    table.increments(_.COL_TYP.ID)
    table.string(_.COL_TYP.NAME)
    table.integer(_.COL_TYP.MT).references(`${__.USER._}.${__.USER.ID}`)
    table.jsonb(_.COL_TYP.LAYOUT)
  })
  */

  await knex.schema.createTableIfNotExists(_.CATEGORY._, (table) => {
    table.increments(_.CATEGORY.ID)
    table.integer(_.CATEGORY.PID).references(`${_.CATEGORY._}.${_.CATEGORY.ID}`)
    table.integer(_.CATEGORY.MT).references(`${__.USER._}.${__.USER.ID}`)
    //table.integer(_.CATEGORY.TYPE).references(`${_.COL_TYP._}.${_.COL_TYP.ID}`)
    table.string(_.CATEGORY.NAME).notNullable()
    table.string(_.CATEGORY.URI).unique().notNullable()
    table.integer(_.CATEGORY.WEIGHT).notNullable().defaultTo(1)
    table.jsonb(_.CATEGORY.CONTENT)
    table.boolean(_.CATEGORY.HID)
    table.timestamps()
    table.jsonb(_.CATEGORY.ATTR)
  })

  await knex.schema.createTableIfNotExists(_.ARTICLE._, (table) => {
    table.increments(_.ARTICLE.ID)
    table.integer(_.ARTICLE.CID).references(`${_.CATEGORY._}.${_.CATEGORY.ID}`)
    table.string(_.ARTICLE.TITLE).notNullable()
    table.string(_.ARTICLE.URI).notNullable()
    table.integer(_.ARTICLE.AUTHOR).references(`${__.USER._}.${__.USER.ID}`)
    table.jsonb(_.ARTICLE.SUMMARY)
    table.jsonb(_.ARTICLE.CONTENT)
    table.boolean(_.ARTICLE.HID)
    table.timestamps()
    table.jsonb(_.ARTICLE.ATTR)
  })

  await knex.schema.alterTable(_.ARTICLE._, (table) => {
    table.unique([_.ARTICLE.CID, _.ARTICLE.URI])
  })

};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTableIfExists(_.ARTICLE._)
  await knex.schema.dropTableIfExists(_.CATEGORY._)
  //await knex.schema.dropTable(_.COL_TYP._)
};
