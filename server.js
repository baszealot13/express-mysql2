const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Service listening on port ${port}`)
})