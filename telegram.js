// telegram.js

import fetch from 'node-fetch';

const telegramToken = 'YOUR_TELEGRAM_BOT_TOKEN'; // Замените на токен вашего бота

// Функция для отправки сообщения через Telegram
export async function sendTelegramMessage(chatId, message) {
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }
}
