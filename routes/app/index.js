const express = require('express')
const router = express.Router()
const { ERRORS } = require('../../config/const')

router.get('/lobby', (req, res) => {
  res.render('lobby', { title: 'Lobby', user: req.user, error: ERRORS[req.query.error] })
})

router.get('/', (req, res) => {
  res.render('landing', { title: 'Welcome', user: req.user })
})

module.exports = router
