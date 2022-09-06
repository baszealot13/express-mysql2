const express = require('express')
const routers = express.Router()
const usersRoute = require('./users')
const aboutRoute = require('./about')
const loginRoute = require('./login')
const chatRoute = require('./chat')

routers.use('/users', usersRoute)
routers.use('/about', aboutRoute)
routers.use('/login', loginRoute)
routers.use('/chats', chatRoute)

module.exports = routers