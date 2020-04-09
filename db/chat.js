const db = require('.')

function newMessage({ body, senderId, chatId }) {
  return new Promise((resolve) => {
    db.any(
      `INSERT INTO message_table ("body", "sender_id", "chat_id") VALUES ('${body}', '${senderId}', '${chatId}');`
    )
      .then((results) => {
        resolve({})
      })
      .catch((error) => {
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
        resolve(results.map(message => {
          // TOFIX ugly serialization
          return {
            id: message.id,
            body: message.body,
            senderId: message.sender_id,
            chatId: message.chat_id,
          }
        }))
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error querying messages!' })
      })
  })
}

module.exports = {
  newMessage,
  getMessages,
}
