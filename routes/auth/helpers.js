const db = require("../../db");

function registerUser(user) {
  return new Promise(resolve => {
    db.any(`INSERT INTO user_table ("id", "username", "password") VALUES ('${user.id}', '${user.username}', '${user.password}');`)
    .then((results) => {
      resolve({});
    })
    .catch((error) => {
      resolve({ error: error });
    });    
  });
}

function findById(id) {

}

function findByUsername (username) {

}


module.exports = {
  registerUser,
  findById,
  findByUsername
}