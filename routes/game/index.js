const express = require('express')
const {
  newGame,
  getGamesAll,
  joinGame,
  getPlayers,
  deleteGame,
  updateStatus,
  newState,
  getState,
  updateState
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
const { createInitialState } = require('./state')

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
    state: createInitialState()
  }

  let result = await newGame(
    game.id,
    JSON.stringify(game.status),
    user.id
  )

  result.state = await newState(
    game.id,
    JSON.stringify(serializeState(game.state))
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
    res.sendFile('public/html/game.html', { root: `${__dirname}/../../` })
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
        res.sendFile('public/html/game.html', { root: `${__dirname}/../../` })
      }      
    }
  } else {
    next(createError(500))
  }
})



router.get('/:game_id/update', ensureLoggedIn('/signin'), async (req, res) => {
  let gameId = req.params.game_id
  let players = await getPlayers(gameId)
  let status = JSON.parse(players[0].status)

  let rawState = await getState(gameId)
  let state = JSON.parse(rawState.raw)
  
  res.json({
    player: {
      id: req.user.id,
      username: req.user.username,
    },
    game: {
      id: gameId,
      status: status,
      state: state
    },
    players,
  })
})


router.post('/:game_id/update', ensureLoggedIn('/signin'), async (req, res) => {
  let gameId = req.params.game_id
  let rawState = JSON.stringify(req.body.state)
  let storeResult = await updateState(gameId, rawState)

  res.json({
    error: null,
  })
})


let serializeState = (state) => {
  return {
    country: state.country,
    action: state.action,
    result: state.result,
    turn: state.turn,
    phase: state.phase,
    player: state.player,
    players: state.players,
    countries: [...state.countries],
  }
}
let deserializeState = (state) => {
  return {
    country: state.country,
    action: state.action,
    result: state.result,
    turn: state.turn,
    phase: state.phase,
    player: state.player,
    players: state.players,
    countries: new Map(state.countries),
  }
}

module.exports = router
