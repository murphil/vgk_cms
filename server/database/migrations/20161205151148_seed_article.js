let _ = require('../const.yml.json').SCHEMA.CONTENT
let __ = require('../const.yml.json').SCHEMA
let faker = require('faker')

let counter=(() => {
  let init = 0
  return ()=>{
    init+=1
    return init
  }
})()

exports.up = async function(knex, Promise) {
  let categories = (await knex(_.CATEGORY._).select(_.CATEGORY.ID))
    .map(x=>x.id)

  let editorId = (await knex(__.USER.USER._)
    .select(__.USER.USER.ID)
    .where(__.USER.USER.ACCOUNT, 'editor'))[0][__.USER.USER.ID]

  for (let i of categories) {
    let articles = Array(10).fill(0)
      .map(x=>({
        [_.ARTICLE.CID]     : i,
        [_.ARTICLE.TITLE]   : faker.lorem.words(),
        [_.ARTICLE.URI]     : `${faker.random.word()}--${counter()}`,
        [_.ARTICLE.AUTHOR]  : editorId,
        [_.ARTICLE.CONTENT] : {type: "plainText", payload: faker.lorem.paragraphs()},
        [_.ARTICLE.CTS]     : new Date(),
        [_.ARTICLE.UTS]     : new Date()
      }))

    await knex(_.ARTICLE._).insert(articles)
  }
};

exports.down = async function(knex, Promise) {

};
