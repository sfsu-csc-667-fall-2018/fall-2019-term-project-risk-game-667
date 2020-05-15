const p = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { findUser } = require('../db/user')

p.serializeUser(function (user, done) {
  done(null, user)
})

p.deserializeUser(function (user, done) {
  done(null, user)
})

let passport = p.use(
  new Strategy(async function (username, password, next) {
    let result = await findUser(username)
    if (result.error || !validatePassword(result.password, password)) {
      return next('Incorrect username or password!', false)
    }
    return next(null, result)
  })
)

let validatePassword = (hash, password) => bcrypt.compareSync(password, hash)
let hashPassword = (password) => bcrypt.hashSync(password, 8)
let deriveId = (username) =>
  crypto.createHash('sha256').update(username).digest('hex')

module.exports = {
  passport,
  hashPassword,
  deriveId,
}
