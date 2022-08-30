const express = require('express')
const routers = express.Router()
const usersRoute = require('./users')
const aboutRoute = require('./about')
const loginRoute = require('./login')

routers.use('/users', usersRoute)
routers.use('/about', aboutRoute)
routers.use('/login', loginRoute)

module.exports = routers