const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000; // ← добавили эту строчку

// Папка html как публичная
app.use(express.static(path.join(__dirname, 'html')));

// Открываем index.html при заходе на корень сайта
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT} http://localhost:${PORT}`);
});
