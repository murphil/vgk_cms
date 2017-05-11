const { GraphQLObjectType
  , GraphQLUnionType
  , GraphQLString
  , GraphQLInt
  , GraphQLNonNull
  , GraphQLList
  , GraphQLBoolean
} = require('graphql')
const GraphQLJSON = require('graphql-type-json')

class Ok {
  constructor(value) {
    this.value = value
  }
}

class Err {
  constructor(err) {
    this.error = err
  }
}

let OkType = new GraphQLObjectType({
  name: 'Ok',
  fields: {
    value: { type: GraphQLJSON }
  },
  isTypeOf: value => value instanceof Ok
})

let ErrType = new GraphQLObjectType({
  name: 'Err',
  fields: {
    error: { type: GraphQLJSON }
  },
  isTypeOf: value => value instanceof Err
})

let ResultType = new GraphQLUnionType({
  name: 'ResultType',
  types: [OkType, ErrType],
  resolveType(value) {
    if (value instanceof Ok) {
      return OkType
    }
    if (value instanceof Err) {
      return ErrType
    }
  }
})

let Result = new GraphQLObjectType({
  name: 'Result',
  fields: {
    error: {type: GraphQLString},
    value: {type: GraphQLJSON}
  }
})

module.exports = {
  ResultType, Ok, Err, Result
}