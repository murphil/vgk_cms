const { GraphQLObjectType
      , GraphQLString
      , GraphQLInt
      , GraphQLList
      , GraphQLSchema
      } = require('graphql')
const scm = require('./database/const.yml.json').SCHEMA
let K = require('./database/knexConnection')

let {articleListQuery, articleQuery} = require('./graphql/articleType')
let {userQuery, userMod} = require('./graphql/userType')
let {categoryQuery, contentCollect} = require('./graphql/categoryType')
let {signup, login, resetPassword, verifyToken} = require('./graphql/authorization')
let {layout} = require('./graphql/resourceType')
let {externalMessage} = require('./graphql/messageType')

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: userQuery,
      articles: articleListQuery,
      article: articleQuery,
      layout,
      category: categoryQuery,
      ['content_collect']:contentCollect,
      signup,
      login,
      resetPassword,
      verifyToken,
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      mutUser : userMod,
      externalMessage
    }
  })
});

module.exports = schema
