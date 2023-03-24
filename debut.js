// Ajouter une fonction pour démarrer le jeu
export function displayScores(scoreboardElement, scores) {
    let sortedScores = scores.sort((a, b) => b.score - a.score);
    let tableHTML = '<table>';
    tableHTML += '<tr><th>Nom d\'utilisateur</th><th>Score</th></tr>';
    for (let i = 0; i < sortedScores.length; i++) {
        tableHTML += `<tr><td>${sortedScores[i].username}</td><td>${sortedScores[i].score}</td></tr>`;
    }
    tableHTML += '</table>';
    scoreboardElement.innerHTML = tableHTML;
}
