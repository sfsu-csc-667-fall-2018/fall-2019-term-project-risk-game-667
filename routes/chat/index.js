const express = require('express')
const chat = require('../../db/chat')
const { NEW_MESSAGE } = require('../../config/events')

const router = express.Router()

router.get('/:room', async (req, res) => {
  let getResult = await chat.getMessages("chat_id", req.params.room, 0, 200)
  
  res.send({
    messages: getResult
  })
})


router.post('/:room/new', async (req, res) => {

  let message = {
    senderId: '-1',
    body: req.body.text,
    chatId: req.params.room
  } 
  if(req.user) {
    message.senderId = req.user.id
  }

  let sendResult = await chat.newMessage(message)

  let io = req.app.get('io')
  io.emit( NEW_MESSAGE, message )

  res.send({
    error: null
  })
})

module.exports = router
