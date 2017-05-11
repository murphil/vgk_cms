let _ = require('../const.yml.json').SCHEMA.WORKFLOW
let __ = require('../const.yml.json').SCHEMA.USER
exports.up = async function(knex, Promise) {

  await knex.schema.createTableIfNotExists(_.TEMPLATE._, (t)=>{
    t.string(_.TEMPLATE.NAME).notNullable()
    t.integer(_.TEMPLATE.VER).defaultTo(0)
    t.primary([_.TEMPLATE.NAME, _.TEMPLATE.VER])
    t.jsonb(_.TEMPLATE.CONTENT)
    t.timestamp(_.TEMPLATE.CTS)
    t.jsonb(_.TEMPLATE.ATTR)
  })


  await knex.schema.createTableIfNotExists(_.RECORD._, (t)=>{
    t.increments(_.RECORD.ID)
    t.integer(_.RECORD.UID)
    t.foreign(_.RECORD.UID).references(__.USER.ID).inTable(__.USER._)
    t.string(_.RECORD.TN)
    t.integer(_.RECORD.TV)
    t.foreign([_.RECORD.TN, _.RECORD.TV])
      .references([_.TEMPLATE.NAME, _.TEMPLATE.VER]).inTable(_.TEMPLATE._)
    t.timestamps()
  })

  await knex.schema.createTableIfNotExists(_.MAILTYPE._, t => {
    t.increments(_.MAILTYPE.ID)
    t.string(_.MAILTYPE.NAME)
    t.string(_.MAILTYPE.COMMENT)
    t.jsonb(_.MAILTYPE.ATTR)
  })

  await knex(_.MAILTYPE._).insert({
    [_.MAILTYPE.NAME]: _.MAILTYPE.externalMessage,
    [_.MAILTYPE.COMMENT]: '访客留言'
  })

  await knex.schema.createTableIfNotExists(_.MAIL._, (t)=>{
    t.increments(_.MAIL.ID)
    t.integer(_.MAIL.FID).references(__.USER.ID).inTable(__.USER._)
    t.integer(_.MAIL.TID).references(__.USER.ID).inTable(__.USER._)
    t.integer(_.MAIL.TYPE).references(_.MAILTYPE.ID).inTable(_.MAILTYPE._)
    t.jsonb(_.MAIL.CONTNET)
    t.integer(_.MAIL.RID).references(_.MAIL.ID).inTable(_.MAIL._)
    t.timestamps()
    t.jsonb(_.MAIL.ATTR)
  })

};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists(_.MAIL._)
  await knex.schema.dropTableIfExists(_.MAILTYPE._)
  await knex.schema.dropTableIfExists(_.RECORD._)
  await knex.schema.dropTableIfExists(_.TEMPLATE._)
};
