const constants = require('./global/index')
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes')
const mongodb = require('./mongodb-config')

const initialize = async () => {
  await mongodb.initializeDb()

  app.use(cors())
  app.use(express.json())

  app.use('/', routes)

  app.listen(constants.PORT, () => console.log(`Listening on port ${constants.PORT}`))
}

initialize()