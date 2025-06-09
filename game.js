// game.js
class GameRound {
    constructor(roomId, players, wordBank) {
        this.roomId = roomId;
        this.players = players;
        this.wordBank = wordBank;
        this.currentRound = 0;
        this.totalRounds = 3;
        this.currentDrawerIndex = 0;
        this.timeLeft = 60;
        this.timer = null;
    }
    
    startRound() {
        this.currentRound++;
        this.currentWord = this.selectRandomWord();
        this.timeLeft = 60;
        
        // Notify players
        socket.emit('roundStart', {
            roomId: this.roomId,
            drawer: this.getCurrentDrawer(),
            word: this.currentWord,
            round: this.currentRound,
            totalRounds: this.totalRounds
        });
        
        // Start timer
        this.timer = setInterval(() => {
            this.timeLeft--;
            socket.emit('timerUpdate', {
                roomId: this.roomId,
                timeLeft: this.timeLeft
            });
            
            if (this.timeLeft <= 0) {
                this.endRound();
            }
        }, 1000);
    }
    
    endRound() {
        clearInterval(this.timer);
        this.currentDrawerIndex = (this.currentDrawerIndex + 1) % this.players.length;
        
        if (this.currentRound < this.totalRounds) {
            setTimeout(() => this.startRound(), 3000);
        } else {
            this.endGame();
        }
    }
    
    endGame() {
        // Calculate final scores and emit game over
        socket.emit('gameOver', {
            roomId: this.roomId,
            scores: this.calculateScores()
        });
    }
    
    selectRandomWord() {
        return this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
    }
    
    getCurrentDrawer() {
        return this.players[this.currentDrawerIndex];
    }
    
    calculateScores() {
        // Score calculation logic
    }
}