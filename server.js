const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Game state
let currentWord = '';
let players = {};

io.on('connection', (socket) => {
    console.log('New player connected:', socket.id);

    // Handle drawing data
    socket.on('draw', (data) => {
        socket.broadcast.emit('drawing', data);
    });

    // Handle chat messages
    socket.on('chat', (message) => {
        io.emit('update', { message: `Player: ${message}` });
    });

    // Assign a word to draw (simplified)
    socket.on('request-word', () => {
        const words = ['apple', 'banana', 'cat', 'dog', 'house'];
        currentWord = words[Math.floor(Math.random() * words.length)];
        socket.emit('update', { word: currentWord });
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
