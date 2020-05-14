const db = require('.')

const { MESSAGE_TABLE } = require('../config/const')

function newMessage(message) {
  return new Promise((resolve) => {
    db.any(
      `INSERT INTO ${MESSAGE_TABLE} 
      ("body", "sender_id", "sender_username", "chat_id") 
      VALUES ('${message.body}', '${message.sender.id}', '${message.sender.username}', '${message.chatId}');`
    )
      .then((results) => {
        resolve({ error: null })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error sedning message!' })
      })
  })
}

function getMessages(chatId, offset, limit) {
  return new Promise((resolve) => {
    db.any(
      `SELECT * FROM ${MESSAGE_TABLE} 
      WHERE chat_id = '${chatId}' 
      ORDER BY id DESC 
      OFFSET ${offset} 
      LIMIT ${limit}`
    )
      .then((results) => {
        resolve(results.map(serializeMessage))
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error querying messages!' })
      })
  })
}

function serializeMessage(message) {
  return {
    id: message.id,
    body: message.body,
    sender: {
      id: message.sender_id,
      username: message.sender_username,
    },
    chatId: message.chat_id,
  }
}

module.exports = {
  newMessage,
  getMessages,
}
