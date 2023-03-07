const { MongoClient, ServerApiVersion } = require('mongodb')
const constants = require('./global/index')
const utils = require('./stores/utils')
const mongoose = require('mongoose')

const baseURL = `mongodb+srv://${constants.mongoDB.username}:${constants.mongoDB.password}@${constants.mongoDB.cluster}/`
const options = 'retryWrites=true&w=majority'
const url = `${baseURL}test?${options}`

utils.logMessage(`MongoDB URL: ${url}`)

const client = new MongoClient(url, { useUnifiedTopology: true, serverApi: { version: ServerApiVersion.v1, strict: true } })

let database = null
const initializeDb = async () => {
  if (database) {
    utils.logMessage('Database is already connected.')
    throw new Error('Database is already connected.')
  }

  await client.connect()
  utils.logMessage('Connected successfully to mongoDB.')
  database = client.db(constants.mongoDB.databaseName)

  mongoose.set('strictQuery', true)
  mongoose.set('debug', true)

  await mongoose.connect(`${baseURL}${constants.mongoDB.databaseName}?${options}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true
    }
  }, () => utils.logMessage('Connected successfully to mongoose.'))

  return database
}

const getDatabase = () => {
  if (!database) {
    throw Error('Database is not initialized')
  }

  return database
}

const getOrInitializeDatabase = async () => {
  if (!database) {
    return await initializeDb()
  }

  return database
}

module.exports = {
  initializeDb,
  getDatabase,
  getOrInitializeDatabase
}
