const { WithdrawStore } = require('../stores')
const { sendSuccess, sendError } = require('./utils')

const getWithdraws = async (req, res) => {
  try {
    const withdraws = await WithdrawStore.getAll()

    sendSuccess(res, withdraws)
  } catch (error) {
    sendError(res, 'Error while fetching withdraws.', error)
  }
}

const addWithdraw = async (req, res) => {
  try {
    const withdrawInfo = req.body

    if (!withdrawInfo) {
      return sendError(res, 'withdrawInfo not available.', null, 404)
    }

    const withdraw = await WithdrawStore.save(withdrawInfo)
    sendSuccess(res, withdraw)
  } catch (error) {
    sendError(res, 'Error while adding withdraw.', error)
  }
}

const getWithdraw = async (req, res) => {
  try {
    const withdrawId = req.params.id

    if (!withdrawId) {
      return sendError(res, 'withdrawId not available.', null, 404)
    }

    const withdraw = await WithdrawStore.getById(withdrawId)
    sendSuccess(res, withdraw)
  } catch (error) {
    sendError(res, 'Error while getting withdraw.', error)
  }
}

const deleteWithdraw = async (req, res) => {
  try {
    const withdrawId = req.params.id

    if (!withdrawId) {
      return sendError(res, 'withdrawId not available.', null, 404)
    }

    await WithdrawStore.delete(withdrawId)
    sendSuccess(res, { message: 'withdraw delete successfully' })
  } catch (error) {
    sendError(res, 'Error while delete withdraw.', error)
  }
}

const updateWithdraw = async (req, res) => {
  try {
    const withdrawId = req.body._id
    const whatToUpdate = req.body

    if (!withdrawId) {
      return sendError(res, 'withdrawId not available.', null, 404)
    }

    const withdraw = await WithdrawStore.update(withdrawId, whatToUpdate)
    sendSuccess(res, withdraw)
  } catch (error) {
    sendError(res, 'Error while update withdraw.', error)
  }
}

module.exports = {
  getWithdraws,
  addWithdraw,
  getWithdraw,
  deleteWithdraw,
  updateWithdraw
}