const dialogue = [
    "Hello traveler! What is your name?",
    "Does this world really look cute? But you still need to learn how to f i g h t.",
    "Do not worry, I will become your mentor. I see the potential in you",
    "Try to create your first magical spell and apply it on my clone.",
    "Do not worry, I will not hurt you, since you are a beginner in this world."
];

let currentDialogueIndex = 0;
let username = '';  // Для хранения имени пользователя
let isDialogueActive = true; // Флаг для проверки активности диалога

function updateDialogue() {
    const dialogueText = document.getElementById("intro-text");
    const nextButton = document.getElementById("next-button");
    const closeButton = document.getElementById("close-button"); // Кнопка закрытия
    const nameForm = document.getElementById("name-form");

    if (currentDialogueIndex === 0) {
        nameForm.style.display = "none";  // После ввода имени скрываем форму
        currentDialogueIndex++;
        dialogueText.innerHTML = `Nice to meet you, <span style="color: #f884be; display: inline;">${username}</span> My name is <span style="color:#679BDA; display: inline;">Yumi`;
        nextButton.style.display = "inline-block";
    } else if (currentDialogueIndex === 1) {
        dialogueText.textContent = dialogue[currentDialogueIndex];
        currentDialogueIndex++;
        nextButton.textContent = "❯";
    } else if (currentDialogueIndex === 2) {
        dialogueText.textContent = dialogue[currentDialogueIndex];
        currentDialogueIndex++;
        nextButton.textContent = "❯";
    } else if (currentDialogueIndex === 3) {
        dialogueText.textContent = dialogue[currentDialogueIndex];
        currentDialogueIndex++;
        nextButton.style.display = "none";  // Скрываем кнопку "Next"
        closeButton.style.display = "inline-block";  // Показываем кнопку "Close"
    } else {
        closeDialogue();
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // Проверяем, если кнопка "Next" видна, кликаем по ней
        const nextButton = document.getElementById("next-button");
        if (nextButton.style.display !== "none") {
            nextButton.click();
        }
        
        // Проверяем, если кнопка "Close" видна, кликаем по ней
        const closeButton = document.getElementById("close-button");
        if (closeButton.style.display !== "none") {
            closeButton.click();
        }
    }
});

// Закрытие диалога
function closeDialogue() {
    const boxGame = document.querySelector(".box_game");
    boxGame.style.visibility = "hidden";  // Скрываем без изменения раскладки
    isDialogueActive = false; // Диалог завершен, разблокируем действия
}

// Обработчик отправки имени
document.getElementById("name-form").addEventListener("submit", function(event) {
    event.preventDefault();
    username = document.getElementById("username").value;  // Получаем имя из поля ввода
    updateDialogue();  // Переходим к следующему этапу диалога
});

// Обработчик для кнопки "Следующий"
document.getElementById("next-button").addEventListener("click", updateDialogue);

// Персонаж
let hero = document.querySelector(".hero");
let positionX = 22; // Начальная позиция по горизонтали (в процентах)
let positionY = 55; // Начальная позиция по вертикали (в процентах)
let isJumping = false; // флаг для проверки, прыгнул ли герой
let keys = {}; // Для отслеживания нажатых клавиш

// Установка начальной позиции героя
hero.style.position = "absolute";
hero.style.left = positionX + 'vw';
hero.style.top = positionY + 'vh';


// Функция для движения вправо
function moveRight(speed = 1) {  // Добавил параметр скорости
    if (positionX < window.innerWidth - hero.offsetWidth) { 
        positionX += speed;  
        hero.style.left = positionX + 'vw'; 
    }
}

// Функция для движения влево
function moveLeft() {
    if (positionX > 0) {
        positionX -= 1; 
        hero.style.left = positionX + 'vw'; 
    }
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        let startY = positionY; // Запоминаем начальную позицию
        let jumpHeight = 35; // Высота прыжка в vh
        let jumpUp = 0;
        let dashForward = keys["KeyD"] ? 2 : 0; // Рывок вперёд
        let dashBackward = keys["KeyA"] ? -2 : 0; // Рывок назад

        let jumpInterval = setInterval(function () {
            if (jumpUp < jumpHeight) {
                positionY -= 2; // Быстро поднимаемся
                positionX += dashForward + dashBackward; // Движение в воздухе
                hero.style.top = positionY + 'vh';
                hero.style.left = positionX + 'vw';
                jumpUp += 2;
            } else {
                clearInterval(jumpInterval);

                // Анимация спуска
                let fallInterval = setInterval(function () {
                    if (positionY < startY) {
                        positionY += 2; // Быстро опускаемся
                        hero.style.top = positionY + 'vh';
                    } else {
                        clearInterval(fallInterval);
                        positionY = startY; // Гарантируем возврат на изначальную позицию
                        hero.style.top = positionY + 'vh';
                        isJumping = false;
                    }
                }, 10);
            }
        }, 10);
    }
}



// Функция атаки
function heroAttack() {
    console.log("Attack!");
}

// Обработчики событий для клавиш
document.addEventListener("keydown", function(event) {
    if (isDialogueActive) return; 

    keys[event.code] = true; // Запоминаем, что клавиша нажата

    if (event.code === "KeyD") {
        moveRight();
    } 
    else if (event.code === "KeyA") { 
        moveLeft();
    } 
    else if (event.code === "Space" || event.code === "KeyW") { 
        jump();
    } 
    else if (event.code === "KeyE") { 
        heroAttack();
    }
});

document.addEventListener("keyup", function(event) {
    keys[event.code] = false; // Сбрасываем статус кнопки
});
