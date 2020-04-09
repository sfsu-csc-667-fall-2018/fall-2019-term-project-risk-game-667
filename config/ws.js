const socketIo = require( 'socket.io' )
const { USER_JOINED, MESSAGE_SEND } = require( './events' )

const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  io.on( 'connection', socket => {
    console.log( 'client connected' )

    socket.on( 'disconnect', data => {
      console.log( 'client disconnected' )
    })

    socket.on( USER_JOINED, data => io.emit( USER_JOINED, data ))
    socket.on( MESSAGE_SEND, data => io.emit( MESSAGE_SEND, data ))
  })
}

module.exports = { init }

// const chat = require('../db/chat')

// let wsHandler = async function connection(ws) {
//   let wss = this //TOFIX kinda hacky... or not?

//   let currentMessages = await chat.getMessages('chat_id', 'lobby', 0, 200)
//   ws.send(JSON.stringify(currentMessages))

//   ws.on('message', async function incoming(data) {
//     let newMessage = JSON.parse(data)
//     let processMessage = await chat.sendMessage(
//       newMessage.body,
//       newMessage.senderId,
//       newMessage.chatId
//     )
//     let currentMessages = await chat.getMessages('chat_id', 'lobby', 0, 200)

//     wss.clients.forEach((client) => {
//       client.send(JSON.stringify(currentMessages))
//     })
//     // TODO redesign this logic
//     // use some protocol to define messages
//     // ws.send(JSON.stringify({
//     //   error: null
//     // }));
//   })
// }

// module.exports = {
//   wsHandler,
// }
