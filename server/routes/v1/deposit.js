const router = require('express').Router()

const { getDeposits, addDeposit, getDeposit, deleteDeposit, updateDeposit } = require('../../controllers/deposit')

// Path - /v1/posts
router.get('/', getDeposits)
router.post('/', addDeposit)
router.get('/:id', getDeposit)
router.put('/', updateDeposit)
router.delete('/:id', deleteDeposit)

module.exports = router