// lobby.js
class GameLobby {
    constructor() {
        this.players = [];
        this.roomId = this.generateRoomId();
        this.maxPlayers = 6;
    }
    
    generateRoomId() {
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }
    
    addPlayer(player) {
        if (this.players.length >= this.maxPlayers) return false;
        
        this.players.push(player);
        return true;
    }
    
    removePlayer(playerId) {
        this.players = this.players.filter(p => p.id !== playerId);
    }
    
    getPlayerCount() {
        return this.players.length;
    }
    
    isFull() {
        return this.players.length >= this.maxPlayers;
    }
    
    broadcastPlayerList() {
        socket.emit('playerListUpdate', {
            roomId: this.roomId,
            players: this.players
        });
    }
}