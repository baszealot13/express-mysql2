const express = require('express')
const router = express.Router()
const Tesseract = require('tesseract.js');

router.get('/', (req, res) => {
    try {
        Tesseract.recognize(
            'https://tesseract.projectnaptha.com/img/eng_bw.png',
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            console.log(text);
        })

        res.send('This is route About')
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router