const routes = require('express').Router()
const v1Routes = require('./v1')

routes.use('/v1', v1Routes)
routes.get('/', (_req, res) => res.send('Service working properly!'))

module.exports = routes