const socketIo = require('socket.io')

const init = (app, server) => {
  const io = socketIo(server)
  app.set('io', io)
  io.on('connection', (socket) => {
    socket.on('disconnect', (data) => {})
  })
}

module.exports = { init }
