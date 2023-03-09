const { Server } = require('socket.io')
// const TaskSocket = require('./task.socket')
// const TaskSocketStore = require('./task.store')
// const utils = require('../stores/utils')

class Socket {
  static initialize(server) {

    let counter = 0
    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
      }
    })

    io.on('connection', (socket) => {
      console.log('\x1B[31m User connected =>  :: ', socket.id)

      socket.on('join_room', (data) => {
        socket.join(data)
      })

      const intervalId = setInterval(() => {
        counter++
        console.log('counter', counter)
        socket.emit('counter', counter)
      }, 1000)

      socket.on('send_message', (data) => {
        console.log('send_message', data)
        socket.to(data.room).emit('receive_message', data)
      })

      socket.on('disconnect', () => {
        console.log(`Client disconnected with socket ID ${socket.id}`)
        clearInterval(intervalId)
      })
    })
  }
}

module.exports = Socket
