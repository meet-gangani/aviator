const { DepositStore } = require('../stores')
const { sendSuccess, sendError } = require('./utils')

const getDeposits = async (req, res) => {
  try {
    const deposits = await DepositStore.getAll()

    sendSuccess(res, deposits)
  } catch (error) {
    sendError(res, 'Error while fetching deposits.', error)
  }
}

const addDeposit = async (req, res) => {
  try {
    const depositInfo = req.body

    if (!depositInfo) {
      return sendError(res, 'depositInfo not available.', null, 404)
    }

    const deposit = await DepositStore.save(depositInfo)
    sendSuccess(res, deposit)
  } catch (error) {
    sendError(res, 'Error while adding deposit.', error)
  }
}

const getDeposit = async (req, res) => {
  try {
    const depositId = req.params.id

    if (!depositId) {
      return sendError(res, 'depositId not available.', null, 404)
    }

    const deposit = await DepositStore.getById(depositId)
    sendSuccess(res, deposit)
  } catch (error) {
    sendError(res, 'Error while getting deposit.', error)
  }
}

const deleteDeposit = async (req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return sendError(res, 'depositId not available.', null, 404)
    }

    await DepositStore.delete(id)
    sendSuccess(res, { message: 'deposit delete successfully' })
  } catch (error) {
    sendError(res, 'Error while delete deposit.', error)
  }
}

const updateDeposit = async (req, res) => {
  try {
    const depositId = req.body._id
    const whatToUpdate = req.body

    if (!depositId) {
      return sendError(res, 'depositId not available.', null, 404)
    }

    const deposit = await DepositStore.update(depositId, whatToUpdate)
    sendSuccess(res, deposit)
  } catch (error) {
    sendError(res, 'Error while update deposit.', error)
  }
}

module.exports = {
  getDeposits,
  getDeposit,
  addDeposit,
  deleteDeposit,
  updateDeposit
}