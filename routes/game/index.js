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
const { 
  createInitialState,
  nextPhase,
  createInitialPlayerState
} = require('../../lib/state')
const gameState = require('../../db/state')

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
    state: createInitialState(req.user.id)
  }

  let result = await newGame(
    game.id,
    JSON.stringify(game.status),
    user.id
  )


  let newGameState = serializeState(game.state)
  result.state = await gameState.newState(
    game.id,
    newGameState.turn,
    newGameState.phase,
    newGameState.player,
    JSON.stringify(newGameState.action),
    JSON.stringify(newGameState.players[0]),
    JSON.stringify(newGameState.players[1]),
    JSON.stringify(newGameState.result),
    JSON.stringify(newGameState.countries),
    newGameState.country
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

        await gameState.addSecondPlayer(gameId, JSON.stringify(createInitialPlayerState(req.user.id)))

        let io = req.app.get('io')
        io.emit(emitGameStarted(), { id: gameId })
        res.sendFile('public/html/game.html', { root: `${__dirname}/../../` })
      }      
    }
  } else {
    next(createError(500))
  }
})

let constructState = (state) => {
  let players = [JSON.parse(state.player_1)]

  if(state.player_2 !== 'null') {
    players.push(JSON.parse(state.player_2))
  }
  return {
    id: state.id,
    turn: state.turn,
    phase: state.phase,
    player: state.current_player,
    action: JSON.parse(state.action),
    players,
    result: JSON.parse(state.result),
    countries: JSON.parse(state.countries),
    country: null
  }
}

router.get('/:game_id/update', ensureLoggedIn('/signin'), async (req, res) => {
  let gameId = req.params.game_id
  let players = await getPlayers(gameId)
  let status = JSON.parse(players[0].status)

  let updatedState = await gameState.getState(gameId)
  let state = constructState(updatedState)

  state.playerId = req.user.id 
  state.winner = getWinner(state)

  res.json({
    player: {
      id: req.user.id,
      username: req.user.username,
    },
    game: {
      id: gameId,
      status: status,
      state,
    },
    players,
  })
})

let getWinner = (state) => {
  let ownershipSum = state.countries.reduce((sum, country) => sum + country[1].owner, 0);
  if (ownershipSum === 0) {
    return 0
  } else if (ownershipSum === 42) {
    return 1
  }
  return null
}

router.post('/:game_id/update', ensureLoggedIn('/signin'), async (req, res) => {
  let gameId = req.params.game_id
  let state =  nextPhase(deserializeState(req.body.state))


  let serializedState = serializeState(state)

  let storeUpdatedState = await gameState.updateState(
    gameId,
    serializedState.turn,
    serializedState.phase,
    serializedState.player,
    JSON.stringify(serializedState.action),
    JSON.stringify(serializedState.players[0]),
    JSON.stringify(serializedState.players[1]),
    JSON.stringify(serializedState.result),
    JSON.stringify(serializedState.countries),
    serializedState.country
  )


  let io = req.app.get('io')
  // TODO even should not be hardcoded
  io.emit(`GAME EVENT ${gameId}`, { id: gameId })

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
