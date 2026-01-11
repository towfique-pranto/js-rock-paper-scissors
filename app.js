let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

updateScoreElement();

let isAutoPlay = false;
let invervalId;

function autoPlay(){
    if (!isAutoPlay){
    invervalId = setInterval(function(){
        const playerMove = pickMove();
        playGame(playerMove);
    }, 1500);
    isAutoPlay = true;
    } else {
        clearInterval(invervalId);
        isAutoPlay = false;
    }
    
}

function playGame(playerMove) {
    let computerMove = pickMove();
    let result = "";
    if (playerMove === "scissors") {
        if (computerMove === "rock") {
            result = "You lose!";
        } else if (computerMove === "paper") {
            result = "You win!";
        } else {
            result = `It's a tie!`;
        }
    } else if (playerMove === "paper") {
        if (computerMove === "rock") {
            result = "You win!";
        } else if (computerMove === "paper") {
            result = "It's a tie!";
        } else {
            result = "You lose!";
        }
    } else if (playerMove === "rock") {
        if (computerMove === "rock") {
            result = "It's a tie!";
        } else if (computerMove === "paper") {
            result = "You lose!";
        } else {
            result = "You win!";
        }
    }

    if (result === "You win!") {
        score.wins++;
    } else if (result === "You lose!") {
        score.losses++;
    } else if (result === "It's a tie!") {
        score.ties++;
    }

    localStorage.setItem("score", JSON.stringify(score));

    updateScoreElement();

    document.querySelector(".js-result").innerHTML = result;

    document.querySelector(
        ".js-moves"
    ).innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="" class="move-icon" /> vs
      <img src="images/${computerMove}-emoji.png" alt="" class="move-icon" />
      Computer`;
}

function updateScoreElement() {
    document.querySelector(
        ".js-score"
    ).innerHTML = `Wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

function pickMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "paper";
    } else {
        computerMove = "scissors";
    }
    return computerMove;
}