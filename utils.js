// Utility functions for SketchVerse

// Generate a random pastel color
export function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 85%)`;
  }
  
  // Format time (seconds -> MM:SS)
  export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Create a unique player avatar
  export function generatePlayerAvatar(name) {
    const colors = ['#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      initials: name.slice(0, 2).toUpperCase(),
      color
    };
  }
  
  // Simple word masking for hints (e.g., "elephant" -> "e _ _ p h _ _ t")
  export function maskWord(word, revealedIndices = []) {
    return word.split('').map((char, index) => {
      return revealedIndices.includes(index) || char === ' ' ? char : '_';
    }).join(' ');
  }
  
  // Throttle function for performance optimization
  export function throttle(callback, limit = 100) {
    let waiting = false;
    return function() {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => { waiting = false; }, limit);
      }
    };
  }
  
  // Mobile device detection
  export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }