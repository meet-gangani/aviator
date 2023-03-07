const router = require('express').Router()

const { getWithdraw, addWithdraw, getWithdraws, deleteWithdraw, updateWithdraw } = require('../../controllers/withdraw')

// Path - /v1/posts
router.get('/', getWithdraws)
router.post('/', addWithdraw)
router.get('/:id', getWithdraw)
router.put('/', updateWithdraw)
router.delete('/:id', deleteWithdraw)

module.exports = router