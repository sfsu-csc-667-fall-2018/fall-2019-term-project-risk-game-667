const express = require('express')
const game = require('../../db/game')
const { ensureLoggedIn } = require('connect-ensure-login')

const router = express.Router()

router.get('/all', async (req, res) => {
  let getGamesResult = await game.getGamesAll()
  console.log(getGamesResult)
  res.send(getGamesResult)
})

router.get('/new', ensureLoggedIn('/signin'), async (req, res) => {
  let newGameResult = await game.newGame(req.user)
  res.send({
    error: null,
  })
})

router.get('/:room', ensureLoggedIn('/signin'), (req, res) => {
  res.render('game', { title: 'Game' })
})

module.exports = router
