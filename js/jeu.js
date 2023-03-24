console.log('Page chargée');

let box = document.querySelector('.box');
let click = 0;
let scoreElement = document.querySelector('#score');
let scoreboardElement = document.querySelector('#scoreboard');

let chrono = 30;
let chronoElement = document.querySelector('#chrono');
chronoElement.innerHTML = chrono;

let game = false;
let username = null;

// Récupérer les scores stockés dans localStorage
let scores = JSON.parse(localStorage.getItem('scores')) || [];

// Ajouter un gestionnaire d'événement sur le formulaire d'utilisateur
let userForm = document.querySelector('#user-form');
userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    username = document.querySelector('#username').value.trim();
    document.querySelector('#form-container').style.display = 'none';
    startGame();
    
});

function saveScore() {
    if (username) {
        let score = { username, score: click };
        scores.push(score);

        // Limiter le nombre de scores à 10
        if (scores.length > 10) {
            scores.shift();
        }

        localStorage.setItem('scores', JSON.stringify(scores));
    }
}
// Ajouter une fonction pour afficher les scores
function displayScores() {
    let sortedScores = scores.sort((a, b) => b.score - a.score);
    let tableHTML = '<table>';
    tableHTML += '<tr><th>Nom d\'utilisateur</th><th>Score</th></tr>';
    for (let i = 0; i < sortedScores.length; i++) {
        tableHTML += `<tr><td>${sortedScores[i].username}</td><td>${sortedScores[i].score}</td></tr>`;
    }
    tableHTML += '</table>';
    scoreboardElement.innerHTML = tableHTML;
}

// Ajouter une fonction pour démarrer le jeu
function startGame() {
    game = true;
    console.log('Jeu démarré');

    box.addEventListener("click", () => {
        console.log('click sur la box !');
        if (game) {
            click += 1;
            scoreElement.innerHTML = click;

            let top = Math.floor(Math.random() * window.innerHeight);
            let left = Math.floor(Math.random() * window.innerWidth);

            // box.style.top = top + "px";
            box.style.top = `${top}px`;
            // box.style.backgroundColor = "red";
            box.style.left = `${left}px`;
        }

      
        
    });

    setInterval(() => {
        console.log("timer");
        if (chrono != 0 && game) {
            chrono--;
            chronoElement.innerHTML = chrono;
        }

        if (chrono == 0 && game) {
            game = false;

            scoreElement.innerHTML = click;

            // Enregistrer le score dans localStorage
            saveScore();

            // Afficher les scores
            displayScores();
        }
    }, 1000);
}


// la fonction la sert a supprime le tableau
function clearScores() {
    localStorage.removeItem('scores');
    scores = [];
    displayScores();
}

