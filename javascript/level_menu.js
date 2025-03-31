window.addEventListener('load', function() {
    // Проверяем, есть ли в localStorage информация о доступных уровнях
    const unlockedLevel = localStorage.getItem('levelUnlocked');

    if (unlockedLevel) {
        // Если 2-й уровень доступен, делаем его кнопкой розовой
        if (unlockedLevel >= 2) {
            const level2Button = document.getElementById('level-2');
            level2Button.classList.add('active');  // Делаем кнопку 2-го уровня активной
            level2Button.innerHTML = "2";  // Заменяем иконку на номер уровня
        }
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
