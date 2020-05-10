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
        resolve({ error: 'Username already exists!' })
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


module.exports = {
  registerUser,
  findUser,
  validatePassword,
}
