const constants = require('./global/index')
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes')
const mongodb = require('./mongodb-config')
const http = require('http')
const Socket = require('./socket/socket')

const initialize = async () => {
  await mongodb.initializeDb()

  app.use(cors())
  app.use(express.json())

  app.use('/', routes)

  const server = http.createServer(app)

  Socket.initialize(server)

  server.listen(constants.PORT, () => {
    console.log('SERVER IS RUNNING')
  })
}

initialize()