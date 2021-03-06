const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const JWT_SECRET = 'my secret string'

function hashMd5(str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

function signToken(object) {
  return jwt.sign(object, JWT_SECRET, {
    expiresIn: '6h'
  })
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = {
  hashMd5,
  signToken,
  verifyToken
}