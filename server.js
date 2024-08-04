// server.js

import express from 'express';
import bodyParser from 'body-parser';
import { sendTelegramMessage } from './telegram'; // Импортируем функцию sendTelegramMessage из файла telegram.js

const app = express();
const port = 3000;

app.use(bodyParser.json());

let tokenBalance = 0;
const referralCodes = {};

// Route to generate referral link and send via Telegram
app.post('/generateReferralLink', async (req, res) => {
    const { referralCode, chatId } = req.body;
    referralCodes[referralCode] = 0;
    const referralLink = `http://localhost:${port}/referral?code=${referralCode}`;
    const message = `start playing, every second of your time is money: ${referralLink}`;

    try {
        await sendTelegramMessage(chatId, message); // Используем функцию sendTelegramMessage из telegram.js
        res.send({ referralLink });
    } catch (error) {
        res.status(500).send('Failed to send message via Telegram');
    }
});

// Route to handle referral link visit
app.get('/referral', (req, res) => {
    const { code } = req.query;
    if (referralCodes[code] !== undefined) {
        referralCodes[code] += 1;
        tokenBalance += 1;
        res.send(`Referral code ${code} used. Token balance is now ${tokenBalance}`);
    } else {
        res.status(400).send('Invalid referral code');
    }
});

// Route to check token balance
app.get('/tokenBalance', (req, res) => {
    res.send({ tokenBalance });
});

// Default route to handle 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
