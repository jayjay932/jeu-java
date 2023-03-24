function saveScore(username, click, scores) {
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

export function startGame(box, scoreElement, chronoElement, scoreboardElement, click, username, scores) {
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
            saveScore(username, click, scores);

            // Afficher les scores
            displayScores(scoreboardElement, scores);
        }
    }, 1000);
}

export function clearScores() {
    localStorage.removeItem('scores');
    scores = [];
}
