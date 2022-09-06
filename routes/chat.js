const express = require('express')
const router = express.Router()
const db = require('../models/db')

router.get('/:room', async (req, res) => {
    try {
        const chats = await db.query('SELECT * FROM chats WHERE room=?', req.params.room)

        res.status(200).json(chats)
    } catch (error) {
        console.log({ error })
        res.status(500).json(error)
    }
})

module.exports = router