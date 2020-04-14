const db = require('.')
const crypto = require('crypto')

function newGame(host, status = 'CREATED') {
  return new Promise((resolve) => {
    let id = crypto.createHash('sha256').update(host.id + Date.now()).digest('hex')

    db.any(
      `INSERT INTO game_table ("id", "status") VALUES ('${id}', '${status}');`
    )
      .then((results) => {
        resolve({
          id
        })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error creating a new game!' })
      })
  })
}

function getGamesAll(offset = 0, limit = 100) {
  return new Promise((resolve) => {
    db.any(
      `SELECT * FROM game_table OFFSET ${offset} LIMIT ${limit}`
    )
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
    db.any(
      `SELECT * FROM game_table WHERE id = '${id}'`
    )
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



module.exports = {
  newGame,
  getGamesAll,
  getGame
}
