const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const { findUser, validatePassword } = require('../db/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport.use(new Strategy(
  async function(username, password, next) {
    let result = await findUser('username', username); 
    if (result.error) { 
      return next(null, false); 
    }
    if (!validatePassword(result.password, password)) {
      return next(null, false);
    }
    return next(null, result);
  }
));