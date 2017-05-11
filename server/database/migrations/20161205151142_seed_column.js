let _ = require('../const.yml.json').SCHEMA.CONTENT
let faker = require('faker')
let {loadYaml} = require('../../../utils/yml')
let contentHome = loadYaml('./preferences/content_home.yml')
let contentCategory = loadYaml('./preferences/content_col.yml')
let contentMain = loadYaml('./preferences/content_main.yml')

exports.up = async function(knex, Promise) {

  let rootId = (await knex(_.CATEGORY._)
      .returning(_.CATEGORY.ID)
      .insert([{
        [_.CATEGORY.NAME]: "首页",
        [_.CATEGORY.URI] : _.CATEGORY.MainUri,
        //[_.CATEGORY.TYPE]: mainTypId,
        [_.CATEGORY.CONTENT]: contentHome,
        [_.CATEGORY.CTS] : new Date()
      }])
  )[0]

  faker.locale='zh_CN'
  let lv1Names = [
    {name: '服务', uri: 'service', weight: 66},
    {name: '定价', uri: 'price', weight: 65},
    {name: '新闻', uri: 'news', weight: 64},
    {name: '关于', uri: 'about', weight: 63},
    {name: '联系', uri: 'contact', weight: 62}
  ].map(x=> ({
      [_.CATEGORY.PID] : rootId,
      [_.CATEGORY.NAME]: x.name,
      [_.CATEGORY.URI] : x.uri,
      [_.CATEGORY.CONTENT]: contentCategory,
      [_.CATEGORY.WEIGHT]: x.weight,
      [_.CATEGORY.CTS] : new Date()
    }))
  let lv1 = await knex(_.CATEGORY._)
      .returning(_.CATEGORY.ID)
      .insert(lv1Names)

  for (let i of lv1) {
    let lv2Names = Array(5).fill(0)
      .map(x=> ({
        [_.CATEGORY.PID] : i,
        [_.CATEGORY.NAME]: faker.name.findName(),
        [_.CATEGORY.URI] : faker.random.word()+Math.floor( Math.random()*100 ),
        //[_.CATEGORY.TYPE]: listTypId,
        [_.CATEGORY.CONTENT]: contentMain,
        [_.CATEGORY.CTS] : new Date()
      }))

    await knex(_.CATEGORY._).insert(lv2Names)
  }
};

exports.down = function(knex, Promise) {

};
