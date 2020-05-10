const express = require('express')
const {
  newGame,
  getGamesAll,
  joinGame,
  getPlayers,
  deleteGame
} = require('../../db/game')
const { ensureLoggedIn } = require('connect-ensure-login')
const { emitGameEvent } = require('../../config/events')
const { ROOM_LIMIT } = require('../../config/const')
const { hash } = require('../../lib/util')
const router = express.Router()

router.get('/all', async (req, res) => {
  let games = await getGamesAll()
  if(games.error) {
    res.send([])
  } else {
    games.map(g => g.status = JSON.parse(g.status))
    res.send(games)
  }
})

router.get('/new', ensureLoggedIn('/signin'), async (req, res) => {
  let user = req.user
  let game = {
    id: hash(user.id + Date.now()),
    status: {
      event: 'CREATED',
      timestamp: Date.now(),
    },
  }

  let result = await newGame(
    game.id,
    JSON.stringify(game.status),
    user.id
  )

  let state = { 
    event: 'JOINED',
    timestamp: Date.now(),
  }
  result.join = await joinGame(
    user.id,
    game.id,
    JSON.stringify(state))

  console.log(result)

  let io = req.app.get('io')
  io.emit(emitGameEvent(), '')

  res.send({
    error: undefined,
    game
  })
})


router.post('/delete', ensureLoggedIn('/signin'), async (req, res) => {
  let result = await deleteGame(req.body.id)
  console.log(result)
  
  res.json({
    error: undefined
  })
})

router.get('/:room', ensureLoggedIn('/signin'), async (req, res) => {
  let state = { 
    event: 'JOINED',
    timestamp: Date.now(),
  }
  let joinGameResult = await joinGame(
    req.user.id, 
    req.params.room, 
    JSON.stringify(state))

  console.log(joinGameResult)
  
  
  let players = await getPlayers(req.params.room)
  console.log(players)

  // if (players.length > ROOM_LIMIT) {
  //   // TODO remove if never occured
  //   console.log('Room capacity exceeded bug!')
  //   res.redirect('/lobby')
  // } else if (players.length === ROOM_LIMIT) {
  //   let toggleResult = await toggleStatus(req.params.room, 'STARTED')
  //   let io = req.app.get('io')
  //   let endTime = new Date().getTime() + 30000
  //   io.emit(emitGameEvent(req.params.room), endTime)
  //   let playerTime = endTime - new Date().getTime()
  // }

  res.render('game', { title: 'Game', players })
})

module.exports = router
