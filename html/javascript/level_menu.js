window.addEventListener('load', function() {
    // Проверяем, есть ли в localStorage информация о завершении 1-го уровня
    const unlockedLevel = localStorage.getItem('levelUnlocked');

    // Проверяем, завершен ли первый уровень
    const level1Completed = localStorage.getItem('level1Completed');

    if (level1Completed) {
        // Если первый уровень завершен, активируем второй уровень
        const level2Button = document.getElementById('level-2');
        level2Button.classList.add('active');  // Делаем кнопку второго уровня активной
        level2Button.innerHTML = "2";  // Заменяем иконку на номер уровня

        // Активируем третий уровень, если нужно
        const level3Button = document.getElementById('level-3');
        level3Button.classList.add('active');  // Делаем кнопку третьего уровня активной
        level3Button.innerHTML = "3";  // Заменяем иконку на номер уровня
    } else {
        // Если первый уровень не завершен, показываем только кнопку первого уровня
        const level1Button = document.getElementById('level-1');
        level1Button.classList.add('active');
        level1Button.innerHTML = "1";
    }

    // Если 2-й уровень доступен (по значению в localStorage), делаем его кнопкой активной
    if (unlockedLevel >= 2) {
        const level2Button = document.getElementById('level-2');
        level2Button.classList.add('active');
        level2Button.innerHTML = "2";  // Заменяем иконку на номер уровня
    }
});

// Функция для перехода на уровень
function goToLevel(level) {
    if (level === 2) {
        // Переход на 2-й уровень
        window.location.href = "Level_2.html";
    } else if (level === 3) {
        // Переход на 3-й уровень
        window.location.href = "Level_3.html";
    }
}
