const socketIo = require('socket.io')
const { USER_JOINED, MESSAGE_SEND } = require('./events')

const init = (app, server) => {
  const io = socketIo(server)
  app.set('io', io)

  io.on('connection', (socket) => {
    console.log('client connected')

    socket.on('disconnect', (data) => {
      console.log('client disconnected')
    })

  })
}

module.exports = { init }
