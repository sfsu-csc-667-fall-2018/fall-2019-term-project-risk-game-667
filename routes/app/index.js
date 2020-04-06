const express = require('express')
const router = express.Router()
const { ensureLoggedIn } = require('connect-ensure-login')

router.get('/lobby', (req, res) => {
  res.render('lobby', { title: 'Lobby', user: req.user })
})

router.get('/', (req, res) => {
  res.render('landing', { title: 'Lobby', user: req.user })
})


router.get('/game', ensureLoggedIn('/signin'), (req, res) => {
  res.render('game', { title: 'Game' })
})

module.exports = router
