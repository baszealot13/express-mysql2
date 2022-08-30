const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    try {
        res.send('This is route About')
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router