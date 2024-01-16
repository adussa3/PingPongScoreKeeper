const player1 = {
    score: document.querySelector("#score1"),
    button: document.querySelector("#button1")
}

const player2 = {
    score: document.querySelector("#score2"),
    button: document.querySelector("#button2")
}

const advantageToggle = document.querySelector("#advantage-toggle");
const reset = document.querySelector("#reset");
const input = document.querySelector("#points");

let targetScore = parseInt(input.value);

player1.button.addEventListener("click", function () {
    updateScores(player1, player2);
});

player2.button.addEventListener("click", function () {
    updateScores(player2, player1);
});

input.addEventListener("change", function () {
    targetScore = parseInt(this.value);
});

reset.addEventListener("click", resetGame);

function updateScores(player, opponent) {
    if (!advantageToggle.disabled) advantageToggle.disabled = true;
    if (!input.disabled) input.disabled = true;

    player.score.innerText = parseInt(player.score.innerText) + 1;

    const playerScore = parseInt(player.score.innerText);
    const opponentScore = parseInt(opponent.score.innerText);

    if (playerScore >= targetScore) {
        if (!advantageToggle.checked || playerScore >= opponentScore + 2) {
            player.button.disabled = true;
            opponent.button.disabled = true;
            player.score.classList.add("text-success");
            opponent.score.classList.add("text-danger");
        } else if (playerScore == opponentScore + 1) {
            player.score.innerHTML = playerScore + "<sup>+</sup>";
            opponent.score.innerText = opponentScore;
            player.score.classList.add("text-primary");
        } else {
            player.score.innerText = playerScore;
            player.score.classList.remove("text-primary");
            opponent.score.innerText = playerScore;
            opponent.score.classList.remove("text-primary");
        }
    }
}

function resetGame() {
    advantageToggle.disabled = false;
    input.disabled = false;
    for (let player of [player1, player2]) {
        player.button.disabled = false;

        player.score.innerText = "0";
        player.score.classList.remove("text-success", "text-danger", "text-primary");
    }
}