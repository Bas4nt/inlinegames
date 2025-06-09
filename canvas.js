// canvas.js
import { DrawingSocket } from './socket.js';
import { throttle } from './utils.js';

// When user draws
canvasElement.addEventListener('mousemove', throttle((e) => {
  DrawingSocket.sendStroke({
    x: e.offsetX,
    y: e.offsetY,
    color: currentColor,
    roomId: currentRoom
  });
}, 50));
class DrawingCanvas {
  constructor(canvasElement) {
      this.canvas = canvasElement;
      this.ctx = canvas.getContext('2d');
      this.isDrawing = false;
      this.currentTool = 'pen';
      this.currentColor = '#000000';
      this.lineWidth = 5;
      
      this.setupEventListeners();
  }
  
  setupEventListeners() {
      this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
      this.canvas.addEventListener('mousemove', this.draw.bind(this));
      this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
      this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
      
      // Touch support for mobile
      this.canvas.addEventListener('touchstart', this.handleTouch.bind(this));
      this.canvas.addEventListener('touchmove', this.handleTouch.bind(this));
  }
  
  startDrawing(e) {
      this.isDrawing = true;
      this.draw(e);
  }
  
  draw(e) {
      if (!this.isDrawing) return;
      
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;
      
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.lineWidth;
      
      if (this.lastX === undefined) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
      } else {
          this.ctx.lineTo(x, y);
          this.ctx.stroke();
      }
      
      this.lastX = x;
      this.lastY = y;
      
      // Emit drawing data to server
      socket.emit('draw', {
          x, y, 
          lastX: this.lastX, 
          lastY: this.lastY,
          color: this.currentColor,
          lineWidth: this.lineWidth,
          roomId: currentRoomId
      });
  }
  
  stopDrawing() {
      this.isDrawing = false;
      this.lastX = undefined;
      this.lastY = undefined;
  }
  
  clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  // Additional methods for tools and color selection
}