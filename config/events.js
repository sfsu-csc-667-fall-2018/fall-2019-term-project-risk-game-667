const messageEvent = (chatId) => `NEW MESSAGE ${chatId}`
const lobbyEvent = () => `LOBBY EVENT`
const gameEvent = (gameId) => `GAME EVENT ${gameId}`




module.exports = { 
  messageEvent,
  lobbyEvent,
  gameEvent,
}
