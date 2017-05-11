const {jwtSecretKey} = require('../secret.json')
const jwt = require('jsonwebtoken')

let signJwt = (payload) => {
  return jwt.sign(payload, jwtSecretKey, { algorithm: 'HS256'})
}

let verifyJwt = (token) => {
  return jwt.verify(token, jwtSecretKey)
}

module.exports = {
  signJwt, verifyJwt
}
