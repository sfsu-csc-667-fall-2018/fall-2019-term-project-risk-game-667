const emitNewMessage = (chatId) => `NEW MESSAGE ${chatId}`
const emitNewGame = () => `NEW GAME`

module.exports = { emitNewMessage, emitNewGame }
