// telegramBot.js
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to SketchVerse! 🎨', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Create Game 🏠', callback_data: 'create_game' }],
                [{ text: 'Join Game 👥', callback_data: 'join_game' }]
            ]
        }
    });
});

bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    
    if (data === 'create_game') {
        // Generate room ID and send join link
        const roomId = generateRoomId();
        bot.sendMessage(message.chat.id, `Your game room is ready! Share this link:\n\nhttps://sketchverse.app/join?room=${roomId}`);
    }
    
    // Handle other callback queries
});

// Webhook for game notifications
app.post('/telegram-webhook', (req, res) => {
    // Handle game status updates to send via bot
});