const v1Routes = require('express').Router()
const postRoutes = require('./withdraw')
const depositRoutes = require('./deposit')
const userRoutes = require('./user')

v1Routes.use('/withdraws', postRoutes)
v1Routes.use('/users', userRoutes)
v1Routes.use('/deposits', depositRoutes)

module.exports = v1Routes