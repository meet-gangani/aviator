const router = require('express').Router()

const { getUsers, addUser, getUser, deleteUser, updateUser } = require('../../controllers/user')

// Path - /v1/users
router.get('/', getUsers)
router.post('/', addUser)
router.put('/', updateUser)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)

module.exports = router
