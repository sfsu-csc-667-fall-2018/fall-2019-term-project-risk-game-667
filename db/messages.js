const db = require(".");

function sendMessage(body, senderId, chatId) {
  return new Promise(resolve => {
    db.any(`INSERT INTO message_table ("body", "senderId", "chatId") VALUES ('${body}', '${senderId}', '${chatId}');`)
    .then((results) => {
      resolve({});
    })
    .catch((error) => {
      resolve({ error: 'Error sedning message!' });
    });    
  });
}

function getMessages(attribute, value, offset, limit) {
  return new Promise(resolve => {
    db.any(`SELECT * FROM message_table WHERE ${attribute} = '${value} OFFSET ${offset} LIMIT ${limit}'`)
    .then((results) => {
      resolve(results);
    })
    .catch((error) => {
      resolve({ error: 'Error querying messages!' });
    });    
  });
}


module.exports = {
  getMessages,
  sendMessage
}