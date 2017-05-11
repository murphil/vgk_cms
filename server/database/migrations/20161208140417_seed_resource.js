let _ = require('../const.yml.json').SCHEMA.RESOURCE
let __ = require('../const.yml.json').SCHEMA

exports.up = async function (knex, Promise) {

  let d = [
    ['img', 'jpg', 'image/jpeg', false],
    ['img', 'png', 'image/png', false],
    ['img', 'jpeg', 'image/jpeg', false],
    ['img', 'gif',  'image/gif', false],
    ['doc', 'pdf', 'application/pdf', false],
    ['script', 'js', 'text/javascript', false],
    ['styleSheet', 'css', 'text/css', false],
    ['zip', 'zip', 'application/octet-stream', true],
    ['zip', 'rar', 'application/octet-stream', true],
    ['zip', '7z', 'application/octet-stream', true],
    ['zip', 'tar', 'application/octet-stream', true],
    ['zip', 'gz', 'application/octet-stream', true],
    ['zip', 'tgz', 'application/octet-stream', true],
    ['zip', 'bz2', 'application/octet-stream', true],
    ['zip', 'zst', 'application/octet-stream', true]
  ].map(x => {
    return {
      [_.RESOURCE_EXT.TYPE]: x[0],
      [_.RESOURCE_EXT.NAME]: x[1],
      [_.RESOURCE_EXT.CTY] : x[2],
      [_.RESOURCE_EXT.ATTACH]: x[3]
    }
  })

  await knex(_.RESOURCE_EXT._).insert(d)

  let extId = (await knex(_.RESOURCE_EXT._)
    .select(_.RESOURCE_EXT.ID)
    .where(_.RESOURCE_EXT.NAME, 'png'))[0][_.RESOURCE_EXT.ID]

  let ownId = (await knex(__.USER.USER._)
    .select(__.USER.USER.ID)
    .where(__.USER.USER.ACCOUNT, 'root'))[0][__.USER.USER.ID]

  await knex(_.RESOURCE._).insert({
    [_.RESOURCE.NAME]: 'logo',
    [_.RESOURCE.EXT]: extId,
    [_.RESOURCE.PATH]: '/',
    [_.RESOURCE.FILE]: 'logo.png',
    [_.RESOURCE.OWNER]: ownId
  })

};

exports.down = function (knex, Promise) {

};
