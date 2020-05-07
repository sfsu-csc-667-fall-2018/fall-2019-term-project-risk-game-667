const express = require('express')
const game = require('../../db/game')
const { ensureLoggedIn } = require('connect-ensure-login')
const { emitGameEvent } = require('../../config/events')
const { ROOM_LIMIT } = require('../../config/const')

const router = express.Router()

router.get('/all', async (req, res) => {
  let getGamesResult = await game.getGamesAll()
  console.log(getGamesResult)
  res.send(getGamesResult)
})

router.get('/new', ensureLoggedIn('/signin'), async (req, res) => {
  let newGameResult = await game.newGame(req.user)

  let io = req.app.get('io')
  io.emit(emitGameEvent(), '')

  res.send({
    error: null,
  })
})

router.get('/:room', ensureLoggedIn('/signin'), async (req, res) => {
  let joinGameResult = await game.joinGame(req.user.id, req.params.room)
  console.log(joinGameResult)
  let players = await game.getPlayers(req.params.room)
  console.log(players)


  if(players.length > ROOM_LIMIT) {
    // TODO remove if never occured
    console.log('Room capacity exceeded bug!')
    res.redirect('/lobby')
  } else if(players.length === ROOM_LIMIT) {
    let toggleResult = await game.toggleStatus(req.params.room, 'STARTED')
    let io = req.app.get('io')
    let endTime = new Date().getTime()+30000
    io.emit(emitGameEvent(req.params.room), endTime)
    let playerTime = endtime - new Date().getTime()
  }

  res.render('game', { title: 'Game', players })
})

module.exports = router
