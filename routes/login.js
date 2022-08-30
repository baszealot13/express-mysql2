const express = require('express')
const router = express.Router()
const db = require('../models/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
        const body = req.body
        const users = await db.query('SELECT * FROM Users WHERE user_email=?',
            body.user_email)

        if (!users.length) {
            throw { status: 401 }
        }

        const user = users[0]

        if (!bcrypt.compareSync(body.password, user.password)) {
            throw { status: 401 }
        }

        const token = jwt.sign({ id: user.id }, 'abc123456')

        res.status(200).json({ token })
    } catch (error) {
        if (error.status === 401) {
            return res.status(error.status).json({ message: 'Unauthorize' }).end()
        }
        return res.status(500).json(error).end()
    }
})

module.exports = router