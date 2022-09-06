const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = 8080
const routes = require('./routes')
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./models/db')

const IO = new Server(server, {
    transports: ['websocket', 'polling']
})

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api', routes);

IO.on('connection', (socket) => {
    console.log('Socket was connect');

    socket.on('error', (error) => {
        console.log('Socket error: ', error);
    });

    socket.on('disconnect', (error) => {
        console.log('Socket was disconnect');
    });

    socket.on('join_room', (room) => {
        console.log('join_room event ', room)
        socket.join(room);
    });

    socket.on('message', ({ room, messageText }) => {
        db.query('INSERT INTO chats (message, room, created) VALUES (?, ?, ?)', [
            messageText, 
            room,
            new Date()
        ])
        IO.to(room).emit('message', messageText)
    });
})

server.listen(port, () => {
    console.log(`Service listening on port ${port}`)
})