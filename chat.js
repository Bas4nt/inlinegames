// chat.js
class GameChat {
    constructor() {
        this.messages = [];
        this.socket = socket;
    }
    
    sendMessage(message, sender) {
        const messageData = {
            text: message,
            sender: sender.name,
            senderId: sender.id,
            timestamp: new Date().toISOString(),
            isGuess: this.isPotentialGuess(message)
        };
        
        this.messages.push(messageData);
        this.socket.emit('message', {
            ...messageData,
            roomId: currentRoomId
        });
        
        if (messageData.isGuess) {
            this.checkGuess(message, sender);
        }
    }
    
    isPotentialGuess(message) {
        // Simple check - in real app would compare to current word
        return message.split(' ').length === 1 && message.length > 3;
    }
    
    checkGuess(message, sender) {
        // Compare with current word (case insensitive)
        if (message.toLowerCase() === currentWord.toLowerCase()) {
            // Correct guess logic
            this.socket.emit('correctGuess', {
                player: sender,
                roomId: currentRoomId
            });
        }
    }
}