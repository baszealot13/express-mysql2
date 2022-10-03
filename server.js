const express = require('express')
const app = require('./app')
const http = require('http')
const server = http.createServer(app)
const port = 8080
const { Server } = require('socket.io');
const db = require('./models/db')

const IO = new Server(server, {
    transports: ['websocket', 'polling']
})

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

    socket.on('message', async ({ room, messageText }) => {
        await db.query('INSERT INTO chats (message, room, created) VALUES (?, ?, ?)', [
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