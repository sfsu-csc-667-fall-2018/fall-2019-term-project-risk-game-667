const express = require('express')
const router = express.Router()
const { ensureLoggedIn } = require('connect-ensure-login')

router.get('/', (req, res) => {
  res.render('lobby', { title: 'Lobby', user: req.user })
})

router.get('/game', ensureLoggedIn('/signin'), (req, res) => {
  res.render('game', { title: 'Game' })
})

module.exports = router
