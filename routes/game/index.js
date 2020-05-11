const express = require('express')
const {
  newGame,
  getGamesAll,
  joinGame,
  getPlayers,
  deleteGame,
  updateStatus
} = require('../../db/game')
const { ensureLoggedIn } = require('connect-ensure-login')
const { 
  emitGameCreated,
  emitGameStarted
} = require('../../config/events')
const { ROOM_LIMIT } = require('../../config/const')
const { hash } = require('../../lib/util')
const router = express.Router()
const createError = require('http-errors')

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
  io.emit(emitGameCreated(), { id: game.id })

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

router.get('/:game_id', ensureLoggedIn('/signin'), async (req, res, next) => {
  let gameId = req.params.game_id
  let players = await getPlayers(gameId)
  let status = JSON.parse(players[0].status)

  if(players.filter(p => p.player_id === req.user.id).length === 1) {
    res.render('game', { title: 'Game', players })
  } else if(players.length < ROOM_LIMIT && status.event === 'CREATED') {
    let state = { 
      event: 'JOINED',
      timestamp: Date.now(),
    }
    let join = await joinGame(
      req.user.id, 
      gameId, 
      JSON.stringify(state))

    if(join.error) {
      next(createError(500))  
    } else {
      let players = await getPlayers(gameId)
      if(players.length === ROOM_LIMIT) {
        let status = {
          event: 'STARTED',
          timestamp: Date.now(),
        }
        await updateStatus(
          gameId, 
          JSON.stringify(status))

        let io = req.app.get('io')
        io.emit(emitGameStarted(), { id: gameId })

        res.render('game', { title: 'Game', players })
        
      }      
    }
  } else {
    next(createError(500))
  }
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

})

module.exports = router
