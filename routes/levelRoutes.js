const express = require('express');
const router = express.Router();
const client = require('../db'); // Подключаем базу данных

// Получение текущего уровня игрока
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    client.query('SELECT level FROM players WHERE id = $1', [userId], (err, result) => {
        if (err) {
            return res.status(500).send('Ошибка при получении уровня');
        }
        res.json({ level: result.rows[0].level });
    });
});

// Обновление уровня игрока
router.post('/:userId', (req, res) => {
    const userId = req.params.userId;
    const { newLevel } = req.body;

    client.query('UPDATE players SET level = $1 WHERE id = $2', [newLevel, userId], (err, result) => {
        if (err) {
            return res.status(500).send('Ошибка при обновлении уровня');
        }
        res.send('Уровень обновлен');
    });
});

module.exports = router;
