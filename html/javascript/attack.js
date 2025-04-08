let playerHealth = 100;
let enemyHealth = 100;
let isGameOver = false;  // Флаг для проверки, закончена ли игра

// Функция для обновления полос здоровья
function updateHealthBars() {
    const heroHealthFill = document.getElementById('hero-health-fill');
    const enemyHealthFill = document.getElementById('enemy-health-fill');
    const heroHealthText = document.getElementById('hero-health-text');
    const enemyHealthText = document.getElementById('enemy-health-text');

    // Обновляем ширину полосы здоровья
    heroHealthFill.style.width = playerHealth + '%';
    enemyHealthFill.style.width = enemyHealth + '%';

    // Обновляем текст с текущим здоровьем
    heroHealthText.textContent = `You: ${playerHealth}`;
    enemyHealthText.textContent = `Enemy: ${enemyHealth}`;
}


// Функция мигания врага
function makeEnemyBlink() {
    const enemy = document.querySelector('.enemy');
    
    if (!enemy) return; // Если врага нет, выходим

    enemy.classList.add('enemy-blink'); // Добавляем класс для мигания
    
    setTimeout(() => {
        enemy.classList.remove('enemy-blink'); // Убираем мигание
        enemy.style.display = 'none'; // Скрываем врага
    }, 1500); // Таймер на 2 секунды
}

// Функция для отображения диалога о завершении игры
function showEndDialog() {
    isGameOver = true; // Игра завершена, блокируем дальнейшие действия
    const endDialog = document.getElementById('end-dialog');
    if (endDialog) {
        endDialog.style.display = 'flex'; // Используем flex, чтобы центрировать содержимое
        endDialog.style.justifyContent = 'center';
        endDialog.style.alignItems = 'center';
    }

    // Добавляем обработчик для кнопки "Go to Menu"
    const endDialogButton = document.getElementById('end-dialog-button');
    if (endDialogButton) {
        endDialogButton.addEventListener('click', function() {
            window.location.href = "levelsmenu.html"; // Перенаправляем в меню
        });
    }
}



function heroAttack() {
    const hero = document.querySelector(".hero");
    const heroRect = hero.getBoundingClientRect();

    let fireball = document.createElement("img");
    fireball.src = "../images/effects/1_level/attack_1level_hero.gif";  
    fireball.classList.add("fireball");

    // Устанавливаем начальное положение файербола (рядом с героем)
    fireball.style.left = (heroRect.left + 50) + "px"; // Немного впереди героя
    fireball.style.top = (heroRect.top + 120) + "px";   // Смещаем ниже на 20px

    document.body.appendChild(fireball); 
    moveFireball(fireball);
}


function moveFireball(fireball) {
    let fireballInterval = setInterval(() => {
        let currentX = parseInt(fireball.style.left);
        fireball.style.left = (currentX + 10) + "px"; // Двигаем вперёд

        // Проверяем столкновение с врагом
        if (checkCollision(fireball, document.querySelector(".enemy"))) {
            clearInterval(fireballInterval);
            fireball.remove(); // Удаляем файербол
            enemyHitEffect(); // Запускаем эффект попадания
            decreaseEnemyHealth(20); // Отнимаем 20 HP у врага
        }

        // Удаляем файербол, если он улетел за экран
        if (currentX > window.innerWidth) {
            clearInterval(fireballInterval);
            fireball.remove();
        }
    }, 50);
}
function checkCollision(element1, element2) {
    let rect1 = element1.getBoundingClientRect();
    let rect2 = element2.getBoundingClientRect();

    return (
        rect1.right > rect2.left && 
        rect1.left < rect2.right &&
        rect1.bottom > rect2.top &&
        rect1.top < rect2.bottom
    );
}
function enemyHitEffect() {
    let hitEffect = document.createElement("img");
    hitEffect.src = "../images/effects/1_level/effect_1level_hero.gif"; 
    hitEffect.classList.add("hit-effect");

    let enemy = document.querySelector(".enemy");
    let enemyRect = enemy.getBoundingClientRect();

    hitEffect.style.left = enemyRect.left + "px";
    hitEffect.style.top = (enemyRect.top + 110) + "px";  // Смещаем эффект ниже

    document.body.appendChild(hitEffect);

    setTimeout(() => {
        hitEffect.remove();
    }, 500);
}

if (checkCollision(fireball, document.querySelector(".enemy"))) {
    clearInterval(fireballInterval);
    fireball.remove(); // Удаляем файербол
    enemyHitEffect(); // Запускаем эффект попадания
    console.log("Попадание! Урон должен нанестись.");  // Проверяем, срабатывает ли попадание
    decreaseEnemyHealth(20); // Отнимаем 20 HP у врага
}

function decreaseEnemyHealth(damage) {
    enemyHealth -= damage; // Уменьшаем здоровье врага
    if (enemyHealth < 0) enemyHealth = 0; // Чтобы не ушло в минус
    updateHealthBars(); // Обновляем UI
    console.log("Враг получил урон! HP:", enemyHealth);

    if (enemyHealth <= 0) {
        makeEnemyBlink();
        showEndDialog();
    }
}


// Обработчик для кнопки "Go to Menu"
document.getElementById('end-dialog-close-button').addEventListener('click', function() {
    // Сохраняем, что 2-й уровень теперь доступен
    localStorage.setItem('levelUnlocked', 2); 
    
    // Перенаправляем пользователя в меню уровней
    window.location.href = "levelsmenu.html";
});

// После завершения 1-го уровня
document.getElementById('end-dialog-close-button').addEventListener('click', function() {
    // Сохраняем, что 2-й уровень теперь доступен
    localStorage.setItem('levelUnlocked', 2);
    
    // Перенаправляем пользователя в меню уровней
    window.location.href = "levelsmenu.html";
});
