const db = require('.')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

function registerUser(username, password) {
  return new Promise((resolve) => {
    let user = {
      id: crypto.createHash('sha256').update(username).digest('hex'),
      password: bcrypt.hashSync(password, 8),
      username,
    }
    db.any(
      `INSERT INTO user_table ("id", "username", "password") VALUES ('${user.id}', '${user.username}', '${user.password}');`
    )
      .then((results) => {
        resolve({})
      })
      .catch((error) => {
        resolve({ error: 'Username already exists!' }) //TOFIX it could be some different error! Remove comment after implementing validation on client!
      })
  })
}

function findUser(attribute, value) {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM user_table WHERE ${attribute} = '${value}'`)
      .then((results) => {
        if (results.length === 0) {
          resolve({ error: 'User was not found!' })
        }
        resolve(results[0])
      })
      .catch((error) => {
        resolve({ error: 'Error querying user!' })
      })
  })
}

function validatePassword(hash, password) {
  return bcrypt.compareSync(password, hash)
}

function playingGame(playerId, gameId) {
  return new Promise((resolve) => {
    db.any(
      `SELECT * FROM playing_table WHERE player_id = '${playerId}' AND game_id = '${gameId}';`
    )
      .then((results) => {
        if (results.length > 0) {
          resolve({ error: undefined, result: true })
        }
        resolve({ error: undefined, result: false })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: `Error finding a game with player_id ${playerId}, and game_id ${gameId}` })
      })
  })
}


module.exports = {
  registerUser,
  findUser,
  validatePassword,
  playingGame
}
