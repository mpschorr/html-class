const canvas = document.getElementById('breakoutCanvas');
const ctx = canvas.getContext('2d');

const bgColor = "#E2F7FF"
const ballColor = "#61ccef"
const paddleColor = '#4ebbdf';
const brickColor = '#4ebbdf';

let ballX = canvas.width / 2;
let ballY = canvas.height - 40;
let ballVelX = 3;
let ballVelY = -3;
let ballRadius = 10;

const bricks = [];

const paddleWidth = 150;
const paddleHeight = 15;
let paddleX = canvas.width / 2 - paddleWidth / 2;
let paddleY = canvas.height - paddleHeight - 4;

document.addEventListener('mousemove', (ev) => {
    let newX = (ev.clientX - paddleWidth / 2) - 16;
    if (ev.clientX - paddleWidth / 2 - 20 < 0) newX = 4;
    if (ev.clientX > canvas.width - paddleWidth / 2 + 12) newX = canvas.width - paddleWidth - 4;
    paddleX = newX;
})

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.fillStyle = paddleColor;
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBricks() {
    const brickWidth = 70;
    const brickHeight = 30;
    let brickX = 10;
    let brickY = 30;

    for (let row = 0; row < 3; row++) {
        brickX = 10
        for (let col = 0; col < 6; col++) {
            // ctx.beginPath();
            // ctx.fillStyle = brickColor;
            // ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            brickX += brickWidth + 10;
        }
        brickY += brickHeight + 10;
    }
}

function step() {
    ballX += ballVelX;
    ballY += ballVelY;

    if (ballX >= canvas.width - ballRadius / 2 || ballX <= ballRadius / 2) {
        ballVelX *= -1;
    }
    // if (ballY >= canvas.height - ballRadius / 2 || ballY <= ballRadius / 2) {
    //     ballVelY *= -1;
    // }
    if (ballY <= ballRadius / 2) {
        ballVelY *= -1;
    }

    if (ballY > canvas.height - ballRadius - paddleHeight
        && ballX > paddleX
        && ballX < paddleX + paddleWidth
    ) {
        ballVelY *= -1
    }

    drawBall();
    drawPaddle();
    // drawBricks();
}

setInterval(step, 1 / 60 * 1000);