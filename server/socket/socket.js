const { Server } = require('socket.io')
// const TaskSocket = require('./task.socket')
// const TaskSocketStore = require('./task.store')
// const utils = require('../stores/utils')

class Socket {
  static initialize(server) {
    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
      }
    })

    io.on('connection', (socket) => {
      console.log('\x1B[31m user connected =>  :: ', socket.id)

      let counter = 0
      socket.on('join_room', (data) => {
        socket.join(data)
      })

      setInterval(() => {
        counter++
        console.log('counter', counter)
        socket.emit('counter', counter)
      }, 1000)

      socket.on('send_message', (data) => {
        console.log('send_message', data)
        socket.to(data.room).emit('receive_message', data)
      })
    })
  }
}

module.exports = Socket
