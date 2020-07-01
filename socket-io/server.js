const express = require('express')
const path = require('path')
const socketIo = require('socket.io')

const app = express()
const port = 9000

app.use('/', express.static(path.join(__dirname, 'static')))

const server = app.listen(port, (err) => console.log(err || 'Server open at port ' + port))

setupSocket(server)

function setupSocket(server) {
  const io = socketIo(server)

  io.on('connection', (socket) => {
    console.log('some on connect to server!')
    // send mess from server to client

    let dataAsking = 'You are woman?'
    socket.emit('asking', dataAsking)

    socket.on('answer', (answerAsYesNo) => {
      if(answerAsYesNo == 'yes') {
        socket.emit('result', 'You are beauty!')
      } else {
        socket.emit('result', 'You are handsome!')
      }
    })
  })
}