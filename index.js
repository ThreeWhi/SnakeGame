const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

var speed = 7;
var headX = 0;
var headY = 0;
var speedX = 0;
var speedY = 0;
var snakePartsX = [];
var snakePartsY = [];
var Parts = 0;
var startGame = 1;
var wonScore = 15;

var grid = true;
var size = 20;
var width = canvas.width;
var height = canvas.height;

var RandomX = Math.floor(Math.random() * ((size) - 1));
var RandomY = Math.floor(Math.random() * ((size) - 1));

var appleX = RandomX * size;
var appleY = RandomY * size;

//Game Loop
function drawGame() {
    clearScreen();
    score()
    snakePos();
    CollisionRules();
    drawSnake();
    drawApple();
    eatApple();
    if (grid == true) {
        for (var i = 0; i < size; i++) {
            ctx.fillStyle = 'black'
            ctx.fillRect(i * size, 0, 1, height)
            ctx.fillRect(0, i * size, width, 1)
        }
    }
    if (startGame == 1) {
        setTimeout(drawGame, 1000 / speed);
    }else if (startGame == 2) { //game Over
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'red'
        ctx.font = '40px fantasy';
        ctx.fillText('GameOver', 110, 200);    
        alert('you have LOST press ender to try again!!!')  
    }else if (startGame == 3) { //won
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'yellow'
        ctx.font = '40px fantasy';
        ctx.fillText('WON', 155, 200); 
        alert('you WON press ender to restart!!!')  
    }
}

//Screen Clear 
function clearScreen() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)
}

function drawSnake() {
    ctx.fillStyle = 'green';
    ctx.fillRect(headX, headY, size, size);

    for (var i = 0; i < snakePartsX.length; i++) {
        ctx.fillStyle = 'rgb(124,252,0)';
        ctx.fillRect(snakePartsX[i], snakePartsY[i], size, size)
    }
        snakePartsX.push(headX);
        snakePartsY.push(headY);

    if (snakePartsX.length > Parts) {
        snakePartsX.shift();
    }
    if (snakePartsY.length > Parts) {
        snakePartsY.shift();
    }
}

function snakePos() {
    headX = headX + speedX;
    headY = headY + speedY;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, size, size);
}

function appleRandom() {
    RandomX = Math.floor(Math.random() * ((size) - 1));
    RandomY = Math.floor(Math.random() * ((size) - 1));
    appleX = RandomX * size;
    appleY = RandomY * size;
}   

function eatApple() {
    if (headX == appleX && headY == appleY) {
        appleRandom();
        Parts = Parts + 1;
        won();
    }
}

function CollisionRules() {
    if (headX >= width) {
        headX = 0;
    }
    if (headX == 0 - size) {
        headX = width;
    }
    if (headY >= height) {
        headY = 0;
    }
    if (headY == 0 - size) {
        headY = height;
    }
    for (i = 0; i < snakePartsX.length; i++) {
        if (headX == snakePartsX[i] && headY == snakePartsY[i]) {
            gameOver();
        }
        if (appleX == snakePartsX[i] && appleY == snakePartsY[i]) {
            appleRandom();
        }
    }
}

function gameOver() {
    startGame = 2;
    Parts = 0;
    snakePartsX = [];
    snakePartsY = [];
    speedX = 0;
    speedY = 0;
    headX = 0;
    headY = 0;
    score();
}

function won() {
    if (Parts == wonScore) {
        startGame = 3;
    }
}

function score() {
    if (Parts == 0) {
        document.getElementById("score").innerHTML = "Snake Game";
    }else {
        document.getElementById("score").innerHTML = "Score: " + Parts;
    }
}

function reset() {
    Parts = 0;
    snakePartsX = [];
    snakePartsY = [];
    speedX = 0;
    speedY = 0;
    headX = 0;
    headY = 0;
    score();
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up
    if (event.keyCode == 87) {
        if (speedY == 1 * size)
            return;
        speedY = -1 * size;
        speedX = 0;
    }
    //down
    if (event.keyCode == 83) {
        if (speedY == -1 * size)
            return;
        speedY = 1 * size;
        speedX = 0;
    }
    //left
    if (event.keyCode == 65) {
        if (speedX == 1 * size)
            return;
        speedY = 0;
        speedX = -1 * size;
    }
    //left
    if (event.keyCode == 68) {
        if (speedX == -1 * size)
            return;
        speedY = 0;
        speedX = 1 * size;
    }
    if (event.keyCode == 13) {
        if (startGame == 2 || startGame == 3) {
            reset();
            startGame = 1;
            drawGame();
        }
    }
}

drawGame();
