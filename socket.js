import { throttle } from './utils.js';

let socket;

// Initialize Socket.io connection
export function initSocket() {
  socket = io('https://sketchverse-backend.railway.app', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false
  });

  return socket;
}

// Get current socket instance
export function getSocket() {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
}

// Room-related socket operations
export const RoomSocket = {
  join(roomId, player) {
    return new Promise((resolve, reject) => {
      socket.emit('joinRoom', { roomId, player }, (response) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  },

  leave(roomId) {
    socket.emit('leaveRoom', { roomId });
  },

  onPlayerListUpdate(callback) {
    socket.on('playerListUpdate', callback);
  }
};

// Drawing-related socket operations
export const DrawingSocket = {
  sendStroke: throttle((data) => {
    socket.emit('draw', data);
  }, 50),

  onDrawingReceived(callback) {
    socket.on('drawing', callback);
  },

  clearCanvas(roomId) {
    socket.emit('clearCanvas', { roomId });
  }
};

// Game-related socket operations
export const GameSocket = {
  onRoundStart(callback) {
    socket.on('roundStart', callback);
  },

  onTimerUpdate(callback) {
    socket.on('timerUpdate', callback);
  },

  onGameEnd(callback) {
    socket.on('gameOver', callback);
  },

  submitGuess(roomId, guess) {
    socket.emit('submitGuess', { roomId, guess });
  }
};

// Chat-related socket operations
export const ChatSocket = {
  sendMessage(roomId, message) {
    socket.emit('chatMessage', { roomId, message });
  },

  onMessageReceived(callback) {
    socket.on('newMessage', callback);
  },

  onCorrectGuess(callback) {
    socket.on('correctGuess', callback);
  }
};

// Error handling
socket.on('connect_error', (err) => {
  console.error('Connection error:', err);
  // Show UI error message
  document.dispatchEvent(new CustomEvent('socketError', { 
    detail: 'Failed to connect to game server' 
  }));
});