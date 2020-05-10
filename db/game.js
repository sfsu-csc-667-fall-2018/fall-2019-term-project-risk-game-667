const db = require('.')
const { playingGame } = require('./user')

function newGame(id, status, hostId) {
  return new Promise((resolve) => {
    db.any(
      `INSERT INTO game_table ("id", "status", "host_id") VALUES ('${id}', '${status}', '${hostId}');`
    )
      .then((results) => {
        resolve({ error: undefined })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error creating a new game!', code: 500 })
      })
  })
}

function getGamesAll(offset = 0, limit = 100) {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM game_table OFFSET ${offset} LIMIT ${limit}`)
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error getting games!' })
      })
  })
}

function getGame(id) {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM game_table WHERE id = '${id}'`)
      .then((results) => {
        if (results.length !== 1) {
          resolve({ error: `Error finding a game with id ${id}` })
        }
        resolve()
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error finding a game with id ${id}` })
      })
  })
}

function joinGame(playerId, gameId, state) {
  return new Promise(async (resolve) => {
    db.any(
      `INSERT INTO playing_table ("player_id", "game_id", "state") VALUES ('${playerId}', '${gameId}', '${state}');`
    )
      .then((results) => {
        resolve({ error: undefined })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error joining a game with id ${gameId}`, code: 500 })
      })
  })
}

function getPlayers(gameId) {
  return new Promise(async (resolve) => {
    db.any(`SELECT * FROM playing_table WHERE "game_id" = '${gameId}';`)
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error joining a game with id ${gameId}` })
      })
  })
}

function toggleStatus(id, status) {
  return new Promise((resolve) => {
    db.any(`UPDATE game_table SET "status" = '${status}' WHERE id = '${id}';`)
      .then((results) => {
        resolve()
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error updating game status for a game ${id}!` })
      })
  })
}

module.exports = {
  newGame,
  getGamesAll,
  getGame,
  joinGame,
  getPlayers,
  toggleStatus,
}
