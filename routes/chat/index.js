const express = require('express')
const chat = require('../../db/chat')

const router = express.Router()

router.post('/:room/new', async (req, res) => {

  let message = {
    senderId: '-1',
    body: req.body.text,
    chatId: req.params.room
  } 
  if(req.user) {
    message.sender_id = req.user.id
  }

  let sendResult = await chat.newMessage(message)
  console.log(sendResult)

  res.send({
    error: null
  })
})

module.exports = router
