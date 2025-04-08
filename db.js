const { Client } = require('pg'); // Импортируем класс Client для работы с PostgreSQL

// Подключение к базе данных
const client = new Client({
  host: 'localhost',   // Адрес сервера базы данных
  port: 5432,          // Порт PostgreSQL (по умолчанию 5432)
  database: 'game_db', // Название базы данных
  user: 'postgres', // Имя пользователя PostgreSQL
  password: '1q2w', // Пароль пользователя PostgreSQL
});

client.connect(); // Подключаемся к базе данных

module.exports = client; // Экспортируем клиент, чтобы использовать его в других файлах
