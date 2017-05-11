let _ = require('../const.yml.json').SCHEMA.USER
let PERMISSION = require('../const.yml.json').PERMISSION
let ROLE = require('../const.yml.json').ROLE
let faker = require('faker')


exports.up = async function(knex, Promise) {
  let rootGroupId = (await knex(_.GROUP._)
    .returning(_.GROUP.ID)
    .insert([
      {[_.GROUP.NAME]: "root"},
    ]))[0]

  let userGroupId = (await knex(_.GROUP._)
    .returning(_.GROUP.ID)
    .insert([
      {
        [_.GROUP.NAME]: "user",
        [_.GROUP.PID]: rootGroupId
      }
    ]))[0]

  let rootUserId = (await knex(_.USER._)
    .returning(_.USER.ID)
    .insert([
      {[_.USER.NAME]: "站长"
        ,[_.USER.ACCOUNT]: "root"
        ,[_.USER.CTS]: new Date()
        ,[_.USER.UTS]: new Date()
        ,[_.USER.GID]: rootGroupId
      }
    ])
  )[0]

  let editorUserId = (await knex(_.USER._)
      .returning(_.USER.ID)
      .insert([
        {[_.USER.NAME]: "小编"
          ,[_.USER.ACCOUNT]: "editor"
          ,[_.USER.CTS]: new Date()
          ,[_.USER.UTS]: new Date()
          ,[_.USER.GID]: userGroupId
        }
      ])
  )[0]

  for (let i in ROLE) {
    await knex(_.ROLE._).insert(ROLE[i])
  }

  for (let i in PERMISSION) {
    await knex(_.POWER._).insert(PERMISSION[i])
  }

  let userAdminRoleId = (await knex(_.ROLE._)
    .select(_.ROLE.ID)
    .where(_.ROLE.NAME, ROLE.USER.name))[0][_.ROLE.ID]

  let groupAdminRoleId = (await knex(_.ROLE._)
    .select(_.ROLE.ID)
    .where(_.ROLE.NAME, ROLE.GROUP.name))[0][_.ROLE.ID]

  await knex(_.USER_ROLE._).insert([
    {[_.USER_ROLE.UID] : rootUserId
    ,[_.USER_ROLE.RID] : userAdminRoleId
    },
    {[_.USER_ROLE.UID] : rootUserId
    ,[_.USER_ROLE.RID] : groupAdminRoleId
    }
  ])

  let setUserRolePowerId = (await knex(_.POWER._)
    .select(_.POWER.ID)
    .where(_.POWER.NAME, PERMISSION.UROLE.name))[0][_.POWER.ID]

  await knex(_.ROLE_POWER._).insert([
    {[_.ROLE_POWER.RID]: userAdminRoleId
      ,[_.ROLE_POWER.PID]: setUserRolePowerId
    }
  ])
};

exports.down = async function(knex, Promise) {

};
