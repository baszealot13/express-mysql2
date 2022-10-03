const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello world'})
})
app.use('/api', routes);

module.exports = app;
