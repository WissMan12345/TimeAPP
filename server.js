// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Пример маршрута для обработки реферального кода
app.post('/api/referral', (req, res) => {
    const { userId, referralCode } = req.body;
    console.log(`Получен реферальный код ${referralCode} от пользователя ${userId}`);
    // Здесь можно добавить логику для обработки реферального кода
    res.json({ success: true, message: 'Реферальный код обработан' });
});

// Пример маршрута для обновления баланса
app.post('/api/balance', (req, res) => {
    const { userId, balance } = req.body;
    console.log(`Обновление баланса пользователя ${userId} до ${balance}`);
    // Здесь можно добавить логику для обновления баланса пользователя в базе данных
    res.json({ success: true, message: 'Баланс обновлен' });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
