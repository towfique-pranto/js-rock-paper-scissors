let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

updateScoreElement();

let isAutoPlay = false;
let invervalId;

//const autoPlay = ()=>{};
function autoPlay(){
    if (!isAutoPlay){
        document.querySelector('.js-auto-play-button').innerText = 'Stop Playing';
    invervalId = setInterval(()=>{
        const playerMove = pickMove();
        playGame(playerMove);
    }, 1500);
    isAutoPlay = true;
    } else {
        document.querySelector('.js-auto-play-button').innerText = 'Auto Play';
        clearInterval(invervalId);
        isAutoPlay = false;
    }
    
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click',()=>{
    resetScore();
});

document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
    autoPlay();
});

document.body.addEventListener('keydown',(event)=>{
   // console.log(event.key);
    if(event.key==='r'){
        playGame('rock');
    } else if(event.key==='p'){
        playGame('paper');
    } else if(event.key==='s'){
        playGame('scissors');
    } else if(event.key==='a'){
        autoPlay();
    } else if(event.key==='Backspace'){
        let confirmBox = `<div>Are you sure you want to reset the score? 
        <button class='confirm-yes-button'>Yes</button>
        <button class='confirm-no-button'>No</button></div>`
        document.querySelector('.js-confirmation').innerHTML = confirmBox;
        //resetScore();
        document.querySelector('.confirm-yes-button').addEventListener('click',()=>{
             resetScore();
             document.querySelector('.js-confirmation').innerHTML = '';
        });
        document.querySelector('.confirm-no-button').addEventListener('click',()=>{
             document.querySelector('.js-confirmation').innerHTML = '';
        });
    }
});



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

function resetScore (){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
}