// lagrer dialoglinjene i en tabell
const dialogue = [
    "Hey there! You look new around here. Welcome to Lunaria! We've been waiting for you. What is your name?",
    "Does this world really look cute? But you still need to learn how to f i g h t.",
    "Because you're one of us now. A witch. But before you can learn magic, you need to prove yourself. Come, I'll show you around.",
    "Try to create your first magical spell and apply it on my clone.",
    "Do not worry, I will not hurt you, since you are a beginner in this world."
];

let currentDialogueIndex = 0;
let username = '';  // lagrer spillerens navn
let isDialogueActive = true;  // deaktiverer bevegelse mens dialogen pågår

// oppdaterer dialogteksten
function updateDialogue() {
    const dialogueText = document.getElementById("intro-text");
    const nextButton = document.getElementById("next-button");
    const closeButton = document.getElementById("close-button");
    const nameForm = document.getElementById("name-form");

    if (currentDialogueIndex === 0) {
        nameForm.style.display = "none";  // skjuler navnefeltet etter at det er sendt inn
        currentDialogueIndex++;
        dialogueText.innerHTML = `Nice to meet you, <span style="color: #f884be; display: inline;">${username}</span> My name is <span style="color:#679BDA; display: inline;">Yumi</span>`;
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
        nextButton.style.display = "none";  // skjuler "Neste"-knappen
        closeButton.style.display = "inline-block";  // viser "Lukk"-knappen
    } else {
        closeDialogue();  // avslutter dialogen
    }
}

// lar brukeren trykke Enter for å gå videre i dialogen
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const nextButton = document.getElementById("next-button");
        if (nextButton.style.display !== "none") {
            nextButton.click();
        }

        const closeButton = document.getElementById("close-button");
        if (closeButton.style.display !== "none") {
            closeButton.click();
        }
    }
});

// avslutter dialogboksen
function closeDialogue() {
    const boxGame = document.querySelector(".box_game");
    boxGame.style.visibility = "hidden";
    isDialogueActive = false; // aktiverer figurens bevegelser igjen
}

// henter navnet fra skjemaet
document.getElementById("name-form").addEventListener("submit", function(event) {
    event.preventDefault();
    username = document.getElementById("username").value;
    updateDialogue();  // fortsetter til neste dialoglinje
});

// går videre til neste dialoglinje ved klikk
document.getElementById("next-button").addEventListener("click", updateDialogue);

// figurens startposisjon
let hero = document.querySelector(".hero");
let positionX = 22;
let positionY = 55;
let isJumping = false;
let keys = {};

// plasserer figuren på skjermen
hero.style.position = "absolute";
hero.style.left = positionX + 'vw';
hero.style.top = positionY + 'vh';

// går mot høyre
function moveRight(speed = 1) {
    if (positionX < window.innerWidth - hero.offsetWidth) {
        positionX += speed;
        hero.style.left = positionX + 'vw';
    }
}

// går mot venstre
function moveLeft() {
    if (positionX > 0) {
        positionX -= 1;
        hero.style.left = positionX + 'vw';
    }
}

// hoppemekanikk
function jump() {
    if (!isJumping) {
        isJumping = true;
        let startY = positionY;
        let jumpHeight = 35;
        let jumpUp = 0;
        let dashForward = keys["KeyD"] ? 2 : 0;
        let dashBackward = keys["KeyA"] ? -2 : 0;

        let jumpInterval = setInterval(function () {
            if (jumpUp < jumpHeight) {
                positionY -= 2;
                positionX += dashForward + dashBackward;
                hero.style.top = positionY + 'vh';
                hero.style.left = positionX + 'vw';
                jumpUp += 2;
            } else {
                clearInterval(jumpInterval);

                // faller ned igjen
                let fallInterval = setInterval(function () {
                    if (positionY < startY) {
                        positionY += 2;
                        hero.style.top = positionY + 'vh';
                    } else {
                        clearInterval(fallInterval);
                        positionY = startY;
                        hero.style.top = positionY + 'vh';
                        isJumping = false;
                    }
                }, 10);
            }
        }, 10);
    }
}

// enkel angrepsfunksjon
function heroAttack() {
    console.log("Angrip!");
}

// tastaturkontroller
document.addEventListener("keydown", function(event) {
    if (isDialogueActive) return;

    keys[event.code] = true;

    if (event.code === "KeyD") {
        moveRight();
    } else if (event.code === "KeyA") {
        moveLeft();
    } else if (event.code === "Space" || event.code === "KeyW") {
        jump();
    } else if (event.code === "KeyE") {
        heroAttack();
    }
});

document.addEventListener("keyup", function(event) {
    keys[event.code] = false;
});

// avslutter nivå 1 og åpner nivå 2
function endLevel1() {
    localStorage.setItem('level1Completed', true);
    localStorage.setItem('levelUnlocked', 2);
    document.getElementById('end-dialog').style.display = 'block';
}

// knapp for å gå til nivåmenyen
document.getElementById('end-dialog-close-button').addEventListener('click', () => {
    console.log('Går til meny');
    window.location.href = 'levelsmenu.html';
});
