const {
  GraphQLObjectType
  , GraphQLString
  , GraphQLInt
} = require('graphql')
const scm = require('../database/const.yml.json').SCHEMA

let groupType = new GraphQLObjectType({
  name: 'Group',
  fields: {
    [scm.USER.GROUP.ID]: {type: GraphQLInt},
    [scm.USER.GROUP.PID]: {type: GraphQLInt},
    [scm.USER.GROUP.NAME]: {type: GraphQLString},
    [scm.USER.GROUP.COMMENT]: {type: GraphQLString}
  }
})

module.exports = {
  groupType
}
