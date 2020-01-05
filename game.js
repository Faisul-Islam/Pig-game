// 'use strict';

const HIGH_SCORE = 100;
var currentPlayer = 0;
var firstClick = true;
const playerOneView = document.querySelector(".player-container-one"),
    playerTwoView = document.querySelector(".player-container-two"),
    dice = document.getElementById("dice");

const defCol = playerOneView.style.background,
    currCol = "rgb(124, 123, 120)";

function player() {
    this.score = 0,
        this.tempScore = 0,
        this.hasWon = false;
}
player.prototype.addScore = function(score) {
    this.score += score;
}
player.prototype.addTempScore = function(score) {
    this.tempScore += score;
}
const playerOne = new player();
const playerTwo = new player();

const btnRoll = document.getElementById("btn-roll");
const btnHold = document.getElementById("btn-hold");
btnRoll.onclick = function() {
    var currDice = getRandomInt(1, 6);
    if (firstClick) {
        firstClick = false;
        dice.setAttribute("src", "dice-" + currDice + ".png");
        dice.style.display = "block";
    }
    // dice.style.transform = "rotate(360deg)";

    setTimeout(function() { dice.style.animation = 'none' }, 1000);
    dice.setAttribute("src", "dice-" + currDice + ".png");
    changeView();
    this.style.background = "cornsilk";

    if (currDice == "1") {
        resetTmpScore();
        changeCurrentPlayer();
        changeView();
    }
    document.querySelector('#pl-' + currentPlayer).textContent = currDice + parseInt(document.querySelector('#pl-' + currentPlayer).textContent);

}
btnHold.onclick = function() {
    if (currentPlayer == 0) {
        playerOne.score += parseInt(document.querySelector('#pl-' + currentPlayer).textContent);
        document.querySelector(".player-one-score").textContent = playerOne.score;

    } else {
        playerTwo.score += parseInt(document.querySelector('#pl-' + currentPlayer).textContent);
        document.querySelector(".player-two-score").textContent = playerTwo.score;
    }
    resetTmpScore();
    changeCurrentPlayer();
    changeView();
}

function changeView() {
    if (currentPlayer == 0) {
        playerOneView.style.background = currCol;
        playerTwoView.style.background = defCol;
    } else {
        playerOneView.style.background = defCol;
        playerTwoView.style.background = currCol;
    }
}

function changeCurrentPlayer() {
    if (currentPlayer == 0)
        currentPlayer = 1;
    else {
        currentPlayer = 0;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function resetTmpScore() {
    document.querySelector('#pl-' + currentPlayer).textContent = 0;
}