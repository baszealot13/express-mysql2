const express = require('express')
const router = express.Router()
const db = require('../models/db')
const bcrypt = require('bcrypt')
const RouteProtection = require('../helpers/RouteProtection')

router.get('/', RouteProtection.verify, async (req, res) => {
    try {
        const users = await db.query('SELECT id, username, user_email FROM Users');

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
})
router.get('/:id', RouteProtection.verify, async (req, res) => {
    try {
        const id = req.params.id
        const users = await db.query('SELECT id, username, user_email FROM Users WHERE id=? LIMIT 1', id);

        res.status(200).json(users[0]);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const hash = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
        const inserted = await db.query('INSERT INTO Users (username, password, user_email) VALUES (?, ?, ?)', [
            body.username,
            hash,
            body.user_email
        ]);

        res.status(201).json(inserted);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router