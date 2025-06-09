// server.js
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Game state management
const rooms = new Map();

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    
    socket.on('joinRoom', ({ roomId, username }) => {
        // Room joining logic
    });
    
    socket.on('draw', (data) => {
        // Broadcast drawing to all room members
        socket.to(data.roomId).emit('drawing', data);
    });
    
    socket.on('message', (message) => {
        // Handle chat messages and scoring
    });
    // In server.js
socket.on('draw', (data) => { /* ... */ });
socket.on('chatMessage', (data) => { /* ... */ });
    
    // Additional event handlers
});

server.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});