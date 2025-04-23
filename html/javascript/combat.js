const dialogue = [
    "Hello traveler! What is your name?",
    "Does this world really look cute? But you still need to learn how to f i g h t.",
    "Do not worry, I will become your mentor. I see the potential in you",
    "Try to create your first magical spell and apply it on my clone.",
    "Do not worry, I will not hurt you, since you are a beginner in this world."
];

let currentDialogueIndex = 0;
let username = '';  // her beveger vi navnet av brukeren
let isDialogueActive = true; 

function updateDialogue() {
    const dialogueText = document.getElementById("intro-text");
    const nextButton = document.getElementById("next-button");
    const closeButton = document.getElementById("close-button"); 
    const nameForm = document.getElementById("name-form");

    if (currentDialogueIndex === 0) {
        nameForm.style.display = "none";  // fjerne seg etter på
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
        nextButton.style.display = "none";  // - "Next"
        closeButton.style.display = "inline-block";  // + "Close"
    } else {
        closeDialogue();
    }
}

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

// lukkes dialogen
function closeDialogue() {
    const boxGame = document.querySelector(".box_game");
    boxGame.style.visibility = "hidden";  
    isDialogueActive = false; // fra dette øyeblikket man kan bevege seg 
}

// navn 
document.getElementById("name-form").addEventListener("submit", function(event) {
    event.preventDefault();
    username = document.getElementById("username").value;  // får navn
    updateDialogue();  // neste steg
});

// next button 
document.getElementById("next-button").addEventListener("click", updateDialogue);

// posisjon
let hero = document.querySelector(".hero");
let positionX = 22;
let positionY = 55; 
let isJumping = false; 
let keys = {}; 

// posisjon når vi starter 
hero.style.position = "absolute";
hero.style.left = positionX + 'vw';
hero.style.top = positionY + 'vh';


// til høyre
function moveRight(speed = 1) {  // speed 
    if (positionX < window.innerWidth - hero.offsetWidth) { 
        positionX += speed;  
        hero.style.left = positionX + 'vw'; 
    }
}

// til venstre
function moveLeft() {
    if (positionX > 0) {
        positionX -= 1; 
        hero.style.left = positionX + 'vw'; 
    }
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        let startY = positionY; 
        let jumpHeight = 35; // høylengde
        let jumpUp = 0;
        let dashForward = keys["KeyD"] ? 2 : 0; // rykk fremovre
        let dashBackward = keys["KeyA"] ? -2 : 0; // rykk tilbake

        let jumpInterval = setInterval(function () {
            if (jumpUp < jumpHeight) {
                positionY -= 2; 
                positionX += dashForward + dashBackward; // beveger seg i luft
                hero.style.top = positionY + 'vh';
                hero.style.left = positionX + 'vw';
                jumpUp += 2;
            } else {
                clearInterval(jumpInterval);

                // animasjon som man går ned
                let fallInterval = setInterval(function () {
                    if (positionY < startY) {
                        positionY += 2; 
                        hero.style.top = positionY + 'vh';
                    } else {
                        clearInterval(fallInterval);
                        positionY = startY; // kommer i samme posisjon i Y
                        hero.style.top = positionY + 'vh';
                        isJumping = false;
                    }
                }, 10);
            }
        }, 10);
    }
}



// attack
function heroAttack() {
    console.log("Attack!");
}

// keyborad movings 
document.addEventListener("keydown", function(event) {
    if (isDialogueActive) return; 

    keys[event.code] = true; 

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
    keys[event.code] = false; 
});


// går til menyen - til 2 nivået 
function endLevel1() {
    localStorage.setItem('level1Completed', true); // Save settings
    localStorage.setItem('levelUnlocked', 2); 
    document.getElementById('end-dialog').style.display = 'block'; 
}

document.getElementById('end-dialog-close-button').addEventListener('click', () => {
    console.log('Going to menu'); 
    window.location.href = 'levelsmenu.html';  // går til menyen 
});
