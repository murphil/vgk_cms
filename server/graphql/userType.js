const { GraphQLObjectType
  , GraphQLString
  , GraphQLInt
  , GraphQLList
} = require('graphql')
const K = require('../database/knexConnection')
const scm = require('../database/const.yml.json').SCHEMA
const {TimestampType} = require('./baseType')
const {groupType} = require('./groupType')
const {articleType} = require('./articleType')

let userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    [scm.USER.USER.ID]: { type: GraphQLInt },
    [scm.USER.USER.NAME]: { type: GraphQLString },
    [scm.USER.USER.ACCOUNT]: { type: GraphQLString },
    [scm.USER.USER.GROUP]: {
      type: groupType,
      resolve: async (x) => {
        let res = await K(scm.USER.GROUP._)
          .select()
          .where(scm.USER.GROUP.ID, x[scm.USER.USER.GID])
        return res[0]
      }
    },
    articles: {
      type: new GraphQLList(articleType),
      args: {
        [scm.CONTENT.ARTICLE.ID]: {type: GraphQLInt},
        [scm.CONTENT.ARTICLE.CTS]: {type: TimestampType},
        [scm.CONTENT.ARTICLE.UTS]: {type: TimestampType},
        [scm.CONTENT.ARTICLE.TITLE] : {type: GraphQLString}
      },
      resolve: async (user, params, source, fieldASTs) => {
        let res = await  K(scm.CONTENT.ARTICLE._)
          .select().where(scm.CONTENT.ARTICLE.AUTHOR, user[scm.USER.USER.ID])
        return res
      }
    }
  }
})

let userQuery = {
  type: userType,
  args: {
    [scm.USER.USER.ID]: { type: GraphQLInt },
    [scm.USER.USER.NAME]: {type: GraphQLString}
  },
  resolve:  async (root, x, ...rest) => {
    let res = await K(scm.USER.USER._).select().where(x)
    return res[0]
  }
}

let userMod = {
  type: userType,
  args: {
    [scm.USER.USER.ID]: { type: GraphQLInt },
    [scm.USER.USER.NAME]: {type: GraphQLString}
  },
  resolve:  async (root, x, ...rest) => {
    let res = await K(scm.USER.USER._).select().where(x)
    return res[0]
  }
}

module.exports = {
  userType, userQuery, userMod
}
