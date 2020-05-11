const emitNewMessage = (chatId) => `NEW MESSAGE ${chatId}`
const emitGameCreated = () => `GAME CREATED`
const emitGameStarted = () => `GAME EVENT`

module.exports = { 
  emitNewMessage, 
  emitGameCreated,
  emitGameStarted
}
