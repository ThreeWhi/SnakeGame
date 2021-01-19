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

var size = 20;
var width = canvas.width;
var height = canvas.height;

var Random = Math.floor(Math.random() * ((size) - 1));

var appleX = Random * size;
var appleY = Random * size;

//Game Loop
function drawGame() {
    clearScreen();
    score()
    snakePos();
    CollisionRules();
    drawSnake();
    drawApple();
    eatApple();
    // console.log(appleX, appleY, Parts);
    setTimeout(drawGame, 1000 / speed);
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
        console.log(snakePartsX[i], snakePartsY[i])
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
    Random = Math.floor(Math.random() * ((size) - 1));
    appleX = Random * size;
    appleY = Random * size;
}   

function eatApple() {
    if (headX == appleX && headY == appleY) {
        appleRandom();
        Parts = Parts + 1;
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
    }
}

function gameOver() {
    Parts = 0;
    snakePartsX = [];
    snakePartsY = [];
    speedX = 0;
    speedY = 0;
    headX = 0;
    headY = 0;
}

function score() {
    if (Parts == 0) {
        document.getElementById("score").innerHTML = "Snake Game";
    }else {
        document.getElementById("score").innerHTML = "Score: " + Parts;
    }
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
}

drawGame();