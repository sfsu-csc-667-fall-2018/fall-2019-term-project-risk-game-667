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
    console.log(result); //TODO remove debugging
    if (result.error) { 
      return next(result); 
    }
    if (!validatePassword(result.password, password)) {
      console.log('Invalid password!')
      return next(null, false, { message: 'Incorrect password.' });
    }
    return next(null, result);
  }
));