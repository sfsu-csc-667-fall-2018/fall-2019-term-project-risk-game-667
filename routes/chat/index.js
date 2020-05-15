const express = require('express')
const chat = require('../../db/chat')
const { messageEvent } = require('../../config/events')

const router = express.Router()

router.get('/:chat_id', async (req, res) => {
  let chatId = req.params.chat_id
  let getResult = await chat.getMessages(chatId, 0, 20)

  res.send({
    messages: getResult,
  })
})

router.post('/:chat_id/new', async (req, res) => {
  let message = {
    sender: {
      id: '-1',
      username: 'Guest',
    },
    body: req.body.text,
    chatId: req.params.chat_id,
  }
  if (req.user) {
    message.sender.id = req.user.id
    message.sender.username = req.user.username
  }

  let sendResult = await chat.newMessage(message)

  let io = req.app.get('io')
  io.emit(messageEvent(message.chatId), message)

  res.send({
    error: null,
  })
})

module.exports = router
