const db = require('.')

function newMessage(message) {
  return new Promise((resolve) => {
    db.any(
      `INSERT INTO message_table ("body", "sender_id", "sender_username", "chat_id") VALUES ('${message.body}', '${message.sender.id}', '${message.sender.username}', '${message.chatId}');`
    )
      .then((results) => {
        resolve({})
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error sedning message!' })
      })
  })
}

function getMessages(attribute, value, offset, limit) {
  return new Promise((resolve) => {
    db.any(
      `SELECT * FROM message_table WHERE ${attribute} = '${value}' ORDER BY id DESC OFFSET ${offset} LIMIT ${limit}`
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
