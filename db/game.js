const db = require('.')

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

function deleteGame(id) {
  return new Promise((resolve) => {
    db.any(
      `DELETE FROM game_table WHERE id = '${id}';`
    )
      .then((results) => {
        resolve({ error: undefined })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error deleteing game with id ${id}!`, code: 500 })
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
        resolve({ error: 'Error getting games!', code: 500 })
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
        if (error.code === '23505') {
          resolve({ error: undefined })
        } else {
          resolve({ error: `Error joining a game with id ${gameId}`, code: 500 })
        }
      })
  })
}

function getPlayers(gameId) {
  return new Promise(async (resolve) => {
    db.any(`SELECT player_id, username, status FROM playing_table
            INNER JOIN user_table
            ON user_table.id = player_id
            INNER JOIN game_table
            ON game_table.id = game_id
            WHERE "game_id" = '${gameId}';`)
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error joining a game with id ${gameId}` })
      })
  })
}

function updateStatus(gameId, status) {
  return new Promise((resolve) => {
    db.any(`UPDATE game_table SET "status" = '${status}' WHERE id = '${gameId}';`)
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
  deleteGame,
  getGamesAll,
  getGame,
  joinGame,
  getPlayers,
  updateStatus,
}
