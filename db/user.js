const db = require('.')

const { USER_TABLE } = require('../config/const')

function registerUser(id, username, password) {
  return new Promise((resolve) => {
    db.any(
      `INSERT INTO ${USER_TABLE} 
      ("id", "username", "password") 
      VALUES ('${id}', '${username}', '${password}');`
    )
      .then((results) => {
        resolve({ error: null })
      })
      .catch((error) => {
        resolve({ error: 'Username already exists!', code: 200 })
      })
  })
}

function findUser(username) {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM ${USER_TABLE} WHERE username = '${username}'`)
      .then((results) => {
        if (results.length === 0) {
          resolve({ error: 'User was not found!', code: 200 })
        } else {
          resolve(results[0])
        }
      })
      .catch((error) => {
        resolve({ error: 'Error querying user!', code: 500 })
      })
  })
}

module.exports = {
  registerUser,
  findUser,
}
