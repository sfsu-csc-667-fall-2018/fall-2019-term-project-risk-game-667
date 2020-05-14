const express = require('express')
const { registerUser, deriveId, hashPassword } = require('../../db/user')
const router = express.Router()
const passport = require('../../lib/auth')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

router.get('/signin', ensureLoggedOut('/'), (req, res) => {
  res.render('signin', { title: 'Sign In' })
})

router.post('/signin', function (req, res, next) {
  passport.authenticate('local', function (error, user) {
    if (error) {
      return res.render('signin', { title: 'Sign In', error })
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.redirect('/lobby')
    })
  })(req, res, next)
})

router.get('/signup', ensureLoggedOut('/'), (req, res) => {
  res.render('signup', { title: 'Sign Up' })
})

router.post('/signup', async (req, res) => {
  let username = req.body.username
  let password = hashPassword(req.body.password)
  let id = deriveId(username)
  let result = await registerUser(id, username, password)
  if (result.error) {
    res.render('signup', { title: 'Sign Up', error: result.error })
  } else {
    res.redirect(307, '/signin')
  }
})

router.get('/signout', ensureLoggedIn('/signin'), (req, res) => {
  req.logout()
  res.redirect('/lobby')
})

module.exports = router
