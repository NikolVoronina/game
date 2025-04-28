let playerHealth = 100;
let enemyHealth = 100;
let isGameOver = false;  


function updateHealthBars() {
    const heroHealthFill = document.getElementById('hero-health-fill');
    const enemyHealthFill = document.getElementById('enemy-health-fill');
    const heroHealthText = document.getElementById('hero-health-text');
    const enemyHealthText = document.getElementById('enemy-health-text');

    // hvor mange % av helse man har
    heroHealthFill.style.width = playerHealth + '%';
    enemyHealthFill.style.width = enemyHealth + '%';

    // hvor mange helse man har
    heroHealthText.textContent = `You: ${playerHealth}`;
    enemyHealthText.textContent = `Enemy: ${enemyHealth}`;
}


// Enemy dies
function makeEnemyBlink() {
    const enemy = document.querySelector('.enemy');
    
    if (!enemy) return; 

    enemy.classList.add('enemy-blink'); // blinkende
    
    setTimeout(() => {
        enemy.classList.remove('enemy-blink'); // fjern blinkende
        enemy.style.display = 'none'; 
    }, 1500); 
}

// Dialogen...
function showEndDialog() {
    isGameOver = true; 
    const endDialog = document.getElementById('end-dialog');
    if (endDialog) {
        endDialog.style.display = 'flex'; 
        endDialog.style.justifyContent = 'center';
        endDialog.style.alignItems = 'center';
    }

    // "Go to Menu"
    const endDialogButton = document.getElementById('end-dialog-button');
    if (endDialogButton) {
        endDialogButton.addEventListener('click', function() {
            window.location.href = "levelsmenu.html"; // reiser til menyen
        });
    }
}



function heroAttack() {
    const hero = document.querySelector(".hero");
    const heroRect = hero.getBoundingClientRect();

    let fireball = document.createElement("img");
    fireball.src = "../images/effects/1_level/attack_1level_hero.gif";  
    fireball.classList.add("fireball");

    // hvor står fireball...
    fireball.style.left = (heroRect.left + 50) + "px"; 
    fireball.style.top = (heroRect.top + 120) + "px";   

    document.body.appendChild(fireball); 
    moveFireball(fireball);
}

// hvordan fireball beveger seg
function moveFireball(fireball) {
    let fireballInterval = setInterval(() => {
        let currentX = parseInt(fireball.style.left);
        fireball.style.left = (currentX + 10) + "px"; 

        // Проверяем столкновение с врагом
        if (checkCollision(fireball, document.querySelector(".enemy"))) {
            clearInterval(fireballInterval);
            fireball.remove(); // Fjern fireball
            enemyHitEffect(); // Efekter
            decreaseEnemyHealth(20); // - 20XP 
        }

        // Hvis vi ikke ser fireball, da den fjerner seg 
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
    hitEffect.style.top = (enemyRect.top + 110) + "px";  

    document.body.appendChild(hitEffect);

    setTimeout(() => {
        hitEffect.remove();
    }, 500);
}

if (checkCollision(fireball, document.querySelector(".enemy"))) {
    clearInterval(fireballInterval);
    fireball.remove(); 
    enemyHitEffect(); 
    console.log("Попадание! Урон должен нанестись.");  
    decreaseEnemyHealth(20); 
}


// "damage" effects 
function decreaseEnemyHealth(damage) {
    enemyHealth -= damage; // mindre helse 
    if (enemyHealth < 0) enemyHealth = 0; 
    updateHealthBars(); // Обновляем UI
    console.log("Враг получил урон! HP:", enemyHealth);

    if (enemyHealth <= 0) {
        makeEnemyBlink();
        showEndDialog();
    }
}


// "Go to Menu"
document.getElementById('end-dialog-close-button').addEventListener('click', function() {
   
    localStorage.setItem('levelUnlocked', 2); 
    
   
    window.location.href = "levelsmenu.html";
});


document.getElementById('end-dialog-close-button').addEventListener('click', function() {
   
    localStorage.setItem('levelUnlocked', 2);
    
  
    window.location.href = "levelsmenu.html";
});
