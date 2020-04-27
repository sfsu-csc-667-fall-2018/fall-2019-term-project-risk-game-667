const emitNewMessage = (chatId) => `NEW MESSAGE ${chatId}`
const emitGameEvent = () => `GAME EVENT`

module.exports = { emitNewMessage, emitGameEvent }
