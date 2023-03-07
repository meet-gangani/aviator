const { UserStore } = require('../stores')
const { sendSuccess, sendError } = require('./utils')

const getUsers = async (req, res) => {
  try {
    const users = await UserStore.getAll()

    sendSuccess(res, users)
  } catch (error) {
    sendError(res, 'Error while fetching users.', error)
  }
}

const addUser = async (req, res) => {
  try {
    const userInfo = req.body

    if (!userInfo) {
      return sendError(res, 'user not available.', null, 404)
    }

    const user = await UserStore.save(userInfo)
    sendSuccess(res, user)
  } catch (error) {
    sendError(res, 'Error while adding user.', error)
  }
}

const getUser = async (req, res) => {
  try {
    const userId = req.params.id

    if (!userId) {
      return sendError(res, 'userId not available.', null, 404)
    }

    const user = await UserStore.getById(userId)
    sendSuccess(res, user)
  } catch (error) {
    sendError(res, 'Error while getting user.', error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id

    if (!userId) {
      return sendError(res, 'userId not available.', null, 404)
    }

    await UserStore.delete(userId)
    sendSuccess(res, { message: 'user delete successfully' })
  } catch (error) {
    sendError(res, 'Error while delete user.', error)
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.body._id
    const whatToUpdate = req.body

    if (!userId) {
      return sendError(res, 'userId not available.', null, 404)
    }

    const user = await UserStore.update(userId, whatToUpdate)
    sendSuccess(res, user)
  } catch (error) {
    sendError(res, 'Error while update user.', error)
  }
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser
}