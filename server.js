const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Простой объект для хранения балансов пользователей
const userBalances = {};

// POST запрос для обновления баланса пользователя
app.post('/api/balance', (req, res) => {
    const { userId, balance } = req.body;
    userBalances[userId] = balance;
    res.json({ balance });
});

// POST запрос для обработки реферального кода
app.post('/api/referral', (req, res) => {
    const { userId, referralCode } = req.body;
    const referrerId = Buffer.from(referralCode, 'base64').toString('ascii');

    if (referrerId && referrerId !== userId) {
        userBalances[referrerId] = (userBalances[referrerId] || 0) + 10; // Добавление бонуса за реферал
    }

    res.json({ status: 'success' });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
