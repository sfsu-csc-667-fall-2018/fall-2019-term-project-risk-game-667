const WebSocket = require('ws');
const chat = require('../db/chat');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', async function connection(ws) {
  let currentMessages = await chat.getMessages('chat_id', 'lobby', 0, 200);
  ws.send(JSON.stringify(currentMessages));

  ws.on('message', async function incoming(data) {
    let newMessage = JSON.parse(data);
    let processMessage = await chat.sendMessage(newMessage.body, newMessage.senderId, newMessage.chatId);
    
    let currentMessages = await chat.getMessages('chat_id', 'lobby', 0, 200);
    ws.send(JSON.stringify(currentMessages));    
    // TODO redesign this logic
    // use some protocol to define messages 
    // ws.send(JSON.stringify({
    //   error: null
    // })); 
  });
});

module.exports = wss;