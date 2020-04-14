const express = require('express')
const router = express.Router()

router.get('/lobby', (req, res) => {
  res.render('lobby', { title: 'Lobby', user: req.user })
})

router.get('/', (req, res) => {
  res.render('landing', { title: 'Lobby', user: req.user })
})


module.exports = router
