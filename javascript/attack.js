let playerHealth = 100; // Spillerens helse
let enemyHealth = 100;  // Fiendens helse
let isGameOver = false; // Er spillet ferdig?

// Oppdaterer helse-barene
function updateHealthBars() {
    const heroHealthFill = document.getElementById('hero-health-fill');
    const enemyHealthFill = document.getElementById('enemy-health-fill');
    const heroHealthText = document.getElementById('hero-health-text');
    const enemyHealthText = document.getElementById('enemy-health-text');

    // Hvor mye helse man har i prosent
    heroHealthFill.style.width = playerHealth + '%';
    enemyHealthFill.style.width = enemyHealth + '%';

    // Viser hvor mye helse det er igjen (tekst)
    heroHealthText.textContent = `You: ${playerHealth}`;
    enemyHealthText.textContent = `Enemy: ${enemyHealth}`;
}

// Når fienden dør
function makeEnemyBlink() {
    const enemy = document.querySelector('.enemy');
    
    if (!enemy) return; // Hvis fienden ikke finnes, gjør ingenting

    enemy.classList.add('enemy-blink'); // Legger til blinke-effekt
    
    setTimeout(() => {
        enemy.classList.remove('enemy-blink'); // Fjerner blinke-effekt
        enemy.style.display = 'none'; // Skjuler fienden
    }, 1500); 
}

// Viser dialogen etter man vinner
function showEndDialog() {
    isGameOver = true; // Spillet er over
    const endDialog = document.getElementById('end-dialog');
    if (endDialog) {
        endDialog.style.display = 'flex'; 
        endDialog.style.justifyContent = 'center';
        endDialog.style.alignItems = 'center';
    }

    // Når man klikker "Go to Menu"
    const endDialogButton = document.getElementById('end-dialog-button');
    if (endDialogButton) {
        endDialogButton.addEventListener('click', function() {
            window.location.href = "levelsmenu.html"; // Går til meny
        });
    }
}

// Når helten angriper
function heroAttack() {
    const hero = document.querySelector(".hero");
    const heroRect = hero.getBoundingClientRect();

    let fireball = document.createElement("img");
    fireball.src = "../images/effects/1_level/attack_1level_hero.gif";  
    fireball.classList.add("fireball");

    // Setter hvor "fireball" starter fra
    fireball.style.left = (heroRect.left + 50) + "px"; 
    fireball.style.top = (heroRect.top + 120) + "px";   

    document.body.appendChild(fireball); 
    moveFireball(fireball); // Starter bevegelse
}

// Beveger "fireball"
function moveFireball(fireball) {
    let fireballInterval = setInterval(() => {
        let currentX = parseInt(fireball.style.left);
        fireball.style.left = (currentX + 10) + "px"; 

        // Sjekker om det treffer fienden
        if (checkCollision(fireball, document.querySelector(".enemy"))) {
            clearInterval(fireballInterval); // Stopper animasjon
            fireball.remove(); // Fjerner "fireball"
            enemyHitEffect(); // Viser effekt
            decreaseEnemyHealth(20); // Fjerner 20 helse fra fienden
        }

        // Hvis den går utenfor skjermen → fjerner
        if (currentX > window.innerWidth) {
            clearInterval(fireballInterval);
            fireball.remove();
        }
    }, 50);
}

// Sjekker om to elementer treffer hverandre
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

// Effekt når fienden får skade
function enemyHitEffect() {
    let hitEffect = document.createElement("img");
    hitEffect.src = "../images/effects/1_level/effect_1level_hero.gif"; 
    hitEffect.classList.add("hit-effect");

    let enemy = document.querySelector(".enemy");
    let enemyRect = enemy.getBoundingClientRect();

    // Setter posisjonen til effekten
    hitEffect.style.left = enemyRect.left + "px";
    hitEffect.style.top = (enemyRect.top + 110) + "px";  

    document.body.appendChild(hitEffect);

    setTimeout(() => {
        hitEffect.remove(); // Fjerner etter 0.5 sek
    }, 500);
}

// Hvis det blir treff (gammel testkode)
if (checkCollision(fireball, document.querySelector(".enemy"))) {
    clearInterval(fireballInterval);
    fireball.remove(); 
    enemyHitEffect(); 
    console.log("Попадание! Урон должен нанестись.");  
    decreaseEnemyHealth(20); 
}

// Skader fienden og oppdaterer helsen
function decreaseEnemyHealth(damage) {
    enemyHealth -= damage; // Fjerner helse
    if (enemyHealth < 0) enemyHealth = 0; 
    updateHealthBars(); // Oppdaterer visuell helse
    console.log("Враг получил урон! HP:", enemyHealth);

    if (enemyHealth <= 0) {
        makeEnemyBlink(); // Fienden forsvinner
        showEndDialog(); // Viser vinner-dialog
    }
}

// Når man klikker "Go to Menu"-knapp
document.getElementById('end-dialog-close-button').addEventListener('click', function() {
    localStorage.setItem('levelUnlocked', 2); // Lagrer at neste nivå er åpent - jobber med dette nå...
    window.location.href = "levelsmenu.html"; // Går til "levels menu"
});


