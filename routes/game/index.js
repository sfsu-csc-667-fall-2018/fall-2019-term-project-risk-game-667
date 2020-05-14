const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { ensureLoggedIn } = require('connect-ensure-login')
const {
  createGame,
  deleteGame,
  updateGameState,
  getGameState,
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
const { 
  createInitialState,
  nextPhase,
  serializeState,
  deserializeState,
  formatState,
  getWinner,
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
  let gameId = hash(playerOne + Date.now())
  let gameState = createInitialState()

  let serializedState = serializeState(gameState)
  
  let createGameResult = await createGame(
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

  console.log(createGameResult)

  let io = req.app.get('io')
  io.emit(emitGameCreated(), { id: gameId })

  res.send({
    error: null,
    id: gameId
  })
})

router.post('/delete', ensureLoggedIn('/signin'), async (req, res) => {
  let gameId = req.body.id
  let deleteGameResult = await deleteGame(gameId)
  
  res.json({
    error: null
  })
})

router.get('/:game_id', ensureLoggedIn('/signin'), async (req, res, next) => {
  let gameId = req.params.game_id
  let getGameResult = await getGame(gameId)
  let player = req.user.id
  if(getGameResult.player_one === player || getGameResult.player_two === player) {
    res.sendFile('public/html/game.html', { root: `${__dirname}/../../` })
  } else {
    // TODO this needs to be handled better
    let joinGameResult = await joinGame(gameId, player)
    console.log(joinGameResult)
    res.sendFile('public/html/game.html', { root: `${__dirname}/../../` })
  }
})


router.get('/:game_id/update', ensureLoggedIn('/signin'), async (req, res) => {
  let gameId = req.params.game_id

  let storedState = await getGameState(gameId)
  let gameState = formatState(storedState)

  gameState.playerId = req.user.id 
  gameState.winner = getWinner(gameState)

  res.json({
    state: gameState
  })
})


router.post('/:game_id/update', ensureLoggedIn('/signin'), async (req, res) => {
  let gameId = req.params.game_id
  let gameState =  nextPhase(deserializeState(req.body.state))

  let serializedState = serializeState(gameState)
  let updateStateResult = await updateGameState(
    gameId,
    serializedState.phase,
    serializedState.turn,
    serializedState.player,
    JSON.stringify(serializedState.action),
    JSON.stringify(serializedState.players.map(player => ({ actions: player.actions, newTroops: player.newTroops }))),
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


module.exports = router
