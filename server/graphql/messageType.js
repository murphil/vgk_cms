const { GraphQLObjectType
  , GraphQLString
  , GraphQLInt
  , GraphQLNonNull
  , GraphQLList
  , GraphQLBoolean
} = require('graphql')
const GraphQLJSON = require('graphql-type-json')
const {Result, ResultType, Ok, Err} = require('./resultType')
const K = require('../database/knexConnection')
const ERROR = require('../database/const.yml.json').ERROR
const {signJwt, verifyJwt} = require('../utils/jwt')
const scm = require('../database/const.yml.json').SCHEMA.USER
const mailT = require('../database/const.yml.json').SCHEMA.WORKFLOW.MAILTYPE
const mail = require('../database/const.yml.json').SCHEMA.WORKFLOW.MAIL
const {TimestampType} = require('./baseType')
const {groupType} = require('./groupType')


let externalMessage = {
  type: GraphQLBoolean,
  args: {
    name: {type: GraphQLString},
    mail: {type: GraphQLString},
    phone: {type:GraphQLString},
    content:{type:GraphQLString}
  },
  resolve: async(root, x) => {
      if (x.mail === '' && x.phone === '') {throw ERROR.needContact}
      let em = (await K(mailT._).select(mailT.ID).where(mailT.NAME, mailT.externalMessage))[0][mailT.ID]
      let res = await K(mail._).insert({
        [mail.FID]: null,
        [mail.TID]: null,
        [mail.RID]: null,
        [mail.CTS]: new Date(),
        [mail.TYPE]: em,
        [mail.CONTNET]: x
      })
    return true
  }
}

module.exports = {
  externalMessage
}