const db = require('.')

const { GAME_TABLE, PHASE } = require('../config/const')

function createGame(
  id,
  phase,
  turn,
  currentPlayer,
  currentAction,
  battleResult,
  playerOne,
  playerTwo,
  playersState,
  countriesState
) {
  return new Promise((resolve) => {
    db.any(
      `INSERT INTO ${GAME_TABLE} 
      ("id", 
      "phase", 
      "turn", 
      "current_player", 
      "current_action", 
      "battle_result", 
      "player_one", 
      "player_two", 
      "players_state", 
      "countries_state") 
      VALUES 
      ('${id}', 
      '${phase}', 
      '${turn}', 
      '${currentPlayer}', 
      '${currentAction}', 
      '${battleResult}', 
      '${playerOne}', 
      '${playerTwo}', 
      '${playersState}', 
      '${countriesState}');`
    )
      .then((results) => {
        resolve({ error: null })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error creating a new game ${id}`, code: 500 })
      })
  })
}

function deleteGame(id) {
  return new Promise((resolve) => {
    db.any(
      `DELETE FROM ${GAME_TABLE} 
      WHERE id = '${id}';`
    )
      .then((results) => {
        resolve({ error: null })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error deleteing game ${id}`, code: 500 })
      })
  })
}

function getGames(offset = 0, limit = 100) {
  return new Promise((resolve) => {
    db.any(
      `SELECT id, phase, turn, current_player, player_one, player_two FROM ${GAME_TABLE} 
      OFFSET ${offset} 
      LIMIT ${limit}`
    )
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error getting games`, code: 500 })
      })
  })
}

function getGame(id) {
  return new Promise((resolve) => {
    db.any(
      `SELECT id, phase, turn, current_player, player_one, player_two FROM ${GAME_TABLE} 
      WHERE id = '${id}'`
    )
      .then((results) => {
        if (results.length !== 1) {
          resolve({ error: `Error finding game ${id}`, code: 500 })
        } else {
          resolve(results[0])
        }
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error finding game ${id}`, code: 500 })
      })
  })
}

function joinGame(id, playerTwo) {
  return new Promise(async (resolve) => {
    db.any(
      `UPDATE ${GAME_TABLE} 
      SET "player_two" = '${playerTwo}',
      "phase" = '${PHASE.DEPLOY}' 
      WHERE id = '${id}'
      AND player_two = 'null'
      AND player_one <> '${playerTwo}'`
    )
      .then((results) => {
        console.log(results)
        resolve({ error: null })
      })
      .catch((error) => {
        console.log(error)
        resolve({
          error: `Error joining ${playerTwo} to game ${id}`,
          code: 500,
        })
      })
  })
}

function updateGameState(
  id,
  phase,
  turn,
  currentPlayer,
  currentAction,
  battleResult,
  playersState,
  countriesState
) {
  return new Promise((resolve) => {
    db.any(
      `UPDATE ${GAME_TABLE}
      SET "phase" = '${phase}',
      "turn" = '${turn}',
      "current_player" = '${currentPlayer}',
      "current_action" = '${currentAction}',
      "battle_result" = '${battleResult}',
      "players_state" = '${playersState}',
      "countries_state" = '${countriesState}'
      WHERE "id" = '${id}';`
    )
      .then((results) => {
        resolve({ error: null })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error updating game state ${id}`, code: 500 })
      })
  })
}

function getGameState(id) {
  return new Promise((resolve) => {
    db.any(
      `SELECT * FROM ${GAME_TABLE} 
      WHERE id = '${id}'`
    )
      .then((results) => {
        if (results.length !== 1) {
          resolve({ error: `Error finding game ${id}`, code: 500 })
        } else {
          resolve(results[0])
        }
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error finding game ${id}`, code: 500 })
      })
  })
}

module.exports = {
  createGame,
  deleteGame,
  updateGameState,
  getGameState,
  getGames,
  getGame,
  joinGame,
}
