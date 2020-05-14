const express = require('express')
const { ensureLoggedIn } = require('connect-ensure-login')
const {
  createGame,
  deleteGame,
  updateGameState,
  getGames,
  getGame,
  joinGame,
} = require('../../db/game')
const { 
  emitGameCreated,
  emitGameStarted
} = require('../../config/events')
const { NUM_PLAYERS } = require('../../config/const')
const { hash } = require('../../lib/util')
const router = express.Router()
const createError = require('http-errors')
const { 
  createInitialState,
  nextPhase,
  createInitialPlayerState
} = require('../../lib/game-state')

router.get('/all', async (req, res) => {
  let games = await getGames()
  if(games.error) {
    res.send([])
  } else {
    res.send(games)
  }
})

router.get('/new', ensureLoggedIn('/signin'), async (req, res) => {
  let playerOne = req.user.id
  let gameId = hash(user.id + Date.now())
  let gameState = createInitialState()

  let serializedState = serializeState(gameState)
  
  let resultCreateGame = await createGame(
    gameId,
    serializedState.phase,
    serializedState.turn,
    serializedState.player,
    JSON.stringify(serializedState.action),
    JSON.stringify(serializedState.result),
    playerOne,
    null,
    JSON.stringify(serializedState.players),
    JSON.stringify(serializedState.countries),
  )

  console.log(resultCreateGame)

  let io = req.app.get('io')
  io.emit(emitGameCreated(), { id: gameId })

  res.send({
    error: undefined,
    id: gameId
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
  } else if(players.length < NUM_PLAYERS && status.event === 'CREATED') {
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
      if(players.length === NUM_PLAYERS) {
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
