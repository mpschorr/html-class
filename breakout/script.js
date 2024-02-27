const canvas = document.getElementById('breakoutCanvas');
const ctx = canvas.getContext('2d');

const bgColor = "#E2F7FF"
const ballColor = "#61ccef"
const paddleColor = '#4ebbdf';

let ballX = canvas.width / 2;
let ballY = canvas.height - 40;
let ballVelX = 3;
let ballVelY = -3;
let ballRadius = 10;

const paddleWidth = 150;
const paddleHeight = 15;
let paddleX = canvas.width / 2 - paddleWidth / 2;
let paddleY = canvas.height - paddleHeight - 4;

// document.addEventListener('keydown', (ev) => {
//     if (ev.key == 'ArrowRight' || ev.key == 'd') {
//         paddleX += 20;
//     } else if (ev.key == 'ArrowLeft' || ev.key == 'a') {
//         paddleX -= 20;
//     }
// });

document.addEventListener('mousemove', (ev) => {
    let newX = (ev.clientX - paddleWidth / 2) - 16;
    if (ev.clientX - paddleWidth / 2 - 20 < 0) newX = 4;
    if (ev.clientX > canvas.width - paddleWidth / 2 + 12) newX = canvas.width - paddleWidth - 4;
    paddleX = newX;
})

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // setTimeout(() => {
    //     ctx.fillStyle = bgColor;
    //     ctx.beginPath();
    //     ctx.arc(oldX, oldY, ballRadius + 1, 0, Math.PI * 2);
    //     ctx.fill();
    //     // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // }, 1000)

    // ctx.globalAlpha = 0.1;
    // ctx.fillStyle = bgColor;
    // console.log(hexToRGB(bgColor, 32), ctx.fillStyle)
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.globalAlpha = 1.0;

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
}

setInterval(step, 1 / 60 * 1000);