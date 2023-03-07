/* eslint-disable no-unused-vars */
const mongodb = require('../mongodb-config')

const {
  utils
} = require('../stores')

const test = async () => {
  try {
    await mongodb.getOrInitializeDatabase()

  } catch (exception) {
    utils.logError('Error migrating. ', exception)
  }
  process.exit(1)
}

test()