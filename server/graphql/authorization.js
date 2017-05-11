const { GraphQLObjectType
      , GraphQLString
      , GraphQLInt
      , GraphQLNonNull
      , GraphQLList
      }                    = require('graphql')
const K                    = require('../database/knexConnection')
const ERROR                = require('../database/const.yml.json').ERROR
const {signJwt, verifyJwt} = require('../utils/jwt')
const scm                  = require('../database/const.yml.json').SCHEMA.USER
const {TimestampType}      = require('./baseType')
const {groupType}          = require('./groupType')
const bcrypt               = require('bcrypt-nodejs')
const bcryptRounds         = {
                               User: 5,
                               Admin: 10
                             }

let authorizationType = new GraphQLObjectType({
  name: 'Auth',
  fields: {
    [scm.USER.ID]      : {type: GraphQLInt},
    [scm.USER.ACCOUNT] : {type: GraphQLString},
    [scm.USER.TOKEN]   : {type: GraphQLString},
    [scm.USER.NAME]    : {type: GraphQLString},
    [scm.USER.PASSWORD]: {type: GraphQLString},
    [scm.USER.UTS]     : {type: TimestampType},
    [scm.USER.GID]     : {
      type: groupType,
      resolve: async (x) => {
        let res = await K(scm.GROUP._)
          .select(scm.GROUP.NAME)
          .where(scm.GROUP.ID, x[scm.USER.GID])
        return res[0]
      }
    }
  }
})

let signup = {
  type: authorizationType,
  args: {
    [scm.USER.ACCOUNT] : {type: new GraphQLNonNull(GraphQLString) },
    [scm.USER.PASSWORD]: {type: new GraphQLNonNull(GraphQLString)},
    [scm.USER.NAME]    : {type: GraphQLString}
  },
  resolve: async(root, x) => {
    let salt = bcrypt.genSalt(bcryptRounds.User)
    let pwd  = bcrypt.hashSync(x[scm.USER.PASSWORD], salt)
    let time = new Date()
    let user = Object.assign(x, {
      [scm.USER.PASSWORD]: pwd,
      [scm.USER.CTS]     : time,
      [scm.USER.UTS]     : time
    })
    let id    = (await K(scm.USER._).insert(user).returning(scm.USER.ID))[0]
    let res   = (await K(scm.USER._).select().where(scm.USER.ID, id))[0]
    let token = signJwt({id})
    return Object.assign(res, {[scm.USER.TOKEN]: token})
  }
}

let login = {
  type: authorizationType,
  args: {
    [scm.USER.ACCOUNT] : {type: new GraphQLNonNull(GraphQLString) },
    [scm.USER.PASSWORD]: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve: async(root, x) => {
    try {
      let pwd = (await K(scm.USER._)
        .select(scm.USER.PASSWORD)
        .where(scm.USER.ACCOUNT, x[scm.USER.ACCOUNT]))[0][scm.USER.PASSWORD]
      let valid = bcrypt.compareSync(x[scm.USER.PASSWORD], pwd)
      if (valid) {
        delete x[scm.USER.PASSWORD]
        let token = signJwt(x)
        return Object.assign({}, {[scm.USER.TOKEN]: token})
      } else {
        throw new Error()
      }
    } catch (err) {
      throw new Error(ERROR.accAndPwd)
    }
  }
}
let verifyToken = {
  type: authorizationType,
  args: {
    token: {type: GraphQLString}
  },
  resolve: (root, {token}) => {
    let res = verifyJwt(token)
    return res
  }
}

let resetPassword = {
  type: authorizationType,
  args: {
    [scm.USER.ACCOUNT] : {type: new GraphQLNonNull(GraphQLString) },
    [scm.USER.PASSWORD]: {type: new GraphQLNonNull(GraphQLString)},
    [scm.USER.NEWPWD]  : {type: new GraphQLNonNull(GraphQLString)},
    'rounds'           : {type: GraphQLInt}
  },
  resolve: async (root, x) => {
    try {
      let pwd = (await K(scm.USER._)
        .select(scm.USER.PASSWORD)
        .where(scm.USER.ACCOUNT, x[scm.USER.ACCOUNT]))[0][scm.USER.PASSWORD]
      let valid = bcrypt.compareSync(x[scm.USER.PASSWORD], pwd)
      if (valid) {
        if (x.rounds > 10 || x.rounds < 4) {throw new Error(ERROR.rounds)}
        let salt = bcrypt.genSaltSync(x.rounds || bcryptRounds.User)
        await K(scm.USER._).update({
          [scm.USER.PASSWORD]: bcrypt.hashSync(x[scm.USER.NEWPWD], salt)
        }).where(scm.USER.ACCOUNT, x[scm.USER.ACCOUNT])
        delete x[scm.USER.PASSWORD]
        delete x[scm.USER.NEWPWD]
        delete x['rounds']
        let token = signJwt(x)
        return Object.assign({}, {[scm.USER.TOKEN]: token})
      } else {
        throw new Error()
      }
    } catch (err) {
      if (err.message === ERROR.rounds) {
        throw err
      } else {
        throw new Error(ERROR.accAndPwd)
      }
    }
  }
}

module.exports = {
  login, signup, verifyToken, resetPassword
}
