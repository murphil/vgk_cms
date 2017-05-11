const { GraphQLObjectType
  , GraphQLBoolean
  , GraphQLString
  , GraphQLInt
  , GraphQLList
} = require('graphql')
const GraphQLJSON = require('graphql-type-json')
const {loadYaml} = require('../../utils/yml')
const scm = require('../database/const.yml.json').SCHEMA
const {TimestampType} = require('./baseType')
const K = require('../database/knexConnection')

let articleType = new GraphQLObjectType({
  name: 'Article',
  fields: {
    [scm.CONTENT.ARTICLE.ID]: {type: GraphQLInt},
    [scm.CONTENT.ARTICLE.CTS]: {type: TimestampType},
    [scm.CONTENT.ARTICLE.UTS]: {type: TimestampType},
    [scm.CONTENT.ARTICLE.TITLE] : {type: GraphQLString},
    [scm.CONTENT.ARTICLE.AUTHOR] : {type: GraphQLString},
    [scm.CONTENT.ARTICLE.URI] : {type: GraphQLString},
    [scm.CONTENT.ARTICLE.HID] : {type: GraphQLBoolean},
    [scm.CONTENT.ARTICLE.CONTENT] : {type: GraphQLJSON},
    [scm.CONTENT.ARTICLE.ATTR] : {type: GraphQLJSON},
    [scm.CONTENT.ARTICLE.CURI]: {type: GraphQLString},
    'children': {type: GraphQLJSON}
  }
})

let articleListQuery = {
  type: new GraphQLList(articleType),
    args: {
  "column_uri" : {type: GraphQLString},
  "page": {type: GraphQLInt} //TODO: paginate
},
  resolve: async(root,x,...rest)=>{
    let q = {
      [scm.CONTENT.CATEGORY.URI]: x.column_uri
    }
    let colId = await K(scm.CONTENT.CATEGORY._)
      .select(scm.CONTENT.CATEGORY.ID)
      .where(q)
    let {_:TABLE, ID, CTS, UTS, TITLE, CONTENT, AUTHOR, CID, URI, HID, ATTR} = scm.CONTENT.ARTICLE
    let resQ = K.raw(`
          SELECT ${TABLE}.${ID}, ${TABLE}.${CTS}, ${TABLE}.${UTS}, ${TABLE}.${TITLE},
            ${TABLE}.${CID}, ${TABLE}.${URI}, ${TABLE}.${CONTENT}, ${TABLE}.${ATTR},
            ${scm.USER.USER._}.${scm.USER.USER.NAME} AS ${AUTHOR}
          FROM ${TABLE}
            LEFT OUTER JOIN ${scm.USER.USER._}
              ON ${TABLE}.${AUTHOR} = ${scm.USER.USER._}.${scm.USER.USER.ID}
          WHERE ${CID} = ?
          AND ${HID} ISNULL 
          ;`, [colId[0].id])
    return (await resQ).rows
  }
}

let articleQuery = {
  type: articleType,
  args: {
    [scm.CONTENT.ARTICLE.ID]: {type: GraphQLInt},
    [scm.CONTENT.ARTICLE.TITLE]: {type: GraphQLString},
    [scm.CONTENT.ARTICLE.CONTENT]: {type: GraphQLString}
  },
  resolve: async(root, x) => {
  let {_:TABLE, ID, TITLE, CONTENT, AUTHOR} = scm.CONTENT.ARTICLE
  let res = await K(TABLE).select().where(x)
  return res[0]
}
}

module.exports = {
  articleListQuery, articleType, articleQuery
}
