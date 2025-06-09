// public/js/main.js

import { initDrawingCanvas } from './canvas.js';
import { setupChat } from './chat.js';
import { initLobby } from './lobby.js';
import { GameLobby } from './lobby.js';
import { DrawingCanvas } from './canvas.js';
// In main.js

// Other imports...
// In main.js
import { initSocket } from './socket.js';
import { formatTime } from './utils.js';

// DOM Elements
const joinForm = document.getElementById('join-form');
const gameContainer = document.getElementById('game-container');
const lobbyScreen = document.getElementById('lobby-screen');

// Global State
let socket;
let currentRoom = null;
let player = {
  id: null,
  name: '',
  avatar: '',
  isDrawing: false
};

// Initialize Socket.io connection
function initSocket() {
  socket = io('inlinegames-production-843a.up.railway.app'); // Replace with your backend URL

  socket.on('connect', () => {
    player.id = socket.id;
    console.log('Connected to server with ID:', player.id);
  });

  // Handle incoming drawing data
  socket.on('drawing', (data) => {
    if (!player.isDrawing) { // Don't echo back the drawer's own strokes
      DrawingCanvas.renderRemoteStroke(data);
    }
  });

  // Other event listeners...
}

// Initialize the game
function initGame() {
  initSocket();
  initDrawingCanvas();
  setupChat();
  initLobby();

  // Form submission for joining a room
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    player.name = document.getElementById('player-name').value;
    const roomId = document.getElementById('room-code').value;

    socket.emit('joinRoom', { 
      roomId, 
      player 
    }, (response) => {
      if (response.success) {
        currentRoom = roomId;
        lobbyScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
      }
    });
  });
}

// Start the game when DOM loads
document.addEventListener('DOMContentLoaded', initGame);
