const canvas = document.getElementById('breakoutCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');

let score = 0;
let isGameOver;w

let frameInterval;

const bgColor = "#E2F7FF"
const ballColor = "#61ccef"
const paddleColor = '#4ebbdf';
const brickColor = '#4ebbdf';
const textColor = '#1ca0cc';
const gameOverColor = '#f7434b';
const gameOverColorStroke = '#b4141b';

const gameOverAudio = new Audio('./assets/boowomp.wav');

let ballX = canvas.width / 2;
let ballY = canvas.height - 40;
let ballVelX = 3;
let ballVelY = -3;
let ballRadius = 10;

let bricks;

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
    bricks.forEach(brick => {
        if (brick.isCollision(ballX, ballY)) {
            brick.isVisible = false;
            ballVelY *= -1;
            score++;
        }
        brick.draw();
    })
}

function drawScore() {
    ctx.font = 'bold 16px Poppins';
    ctx.fillStyle = textColor;
    // ctx.fillText(`Score: ${score}`, 8, 20);
    ctx.fillText("Score: " + score, 8, 20);
}

function endGame() {
    clearInterval(frameInterval);
    setTimeout(() => {
        ctx.font = 'bold 56px Poppins'
        ctx.textAlign = 'center';
        // shadow
        ctx.fillStyle = 'rgba(0,0,0,0.16)';
        ctx.fillText("GAME OVER!!!!!", canvas.width / 2 + 4, canvas.height / 2 + 4)
        // ctx.fillTe
        // fill
        ctx.fillStyle = gameOverColor;
        ctx.fillText("GAME OVER!!!!!", canvas.width / 2, canvas.height / 2)
        // stroke
        ctx.strokeStyle = gameOverColorStroke;
        ctx.strokeWeight = 10;
        ctx.strokeText("GAME OVER!!!!!", canvas.width / 2, canvas.height / 2)
        console.log('done :3')
    }, 100)

};

function spawnBricks() {
    bricks = [];
    const brickWidth = 70;
    const brickHeight = 30;
    let brickX = 10;
    let brickY = 30;
    // const colors = ['#f7434b', '#f77c43', '#fccc3a']
    const colors = [['#f7434b', '#b4141b'], ['#f77c43', '#c95018'], ['#fccc3a', '#c28c12']]

    for (let row = 0; row < 3; row++) {
        brickX = 10
        for (let col = 0; col < 6; col++) {
            bricks.push({
                x: brickX,
                y: brickY,
                fillColor: colors[row][0],
                strokeColor: colors[row][1],
                isVisible: true,
                draw() {
                    if (!this.isVisible) return;
                    ctx.fillStyle = this.fillColor;
                    ctx.fillRect(this.x, this.y, brickWidth, brickHeight);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = this.strokeColor;
                    ctx.strokeRect(this.x, this.y, brickWidth, brickHeight);
                },
                isCollision(ballX, ballY) {
                    return (
                        this.isVisible
                        && this.x < ballX
                        && this.x + brickWidth > ballX
                        && this.y < ballY
                        && this.y + brickHeight > ballY
                    )
                }
            })
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
        ballVelX *= Math.random() / 5 + 0.9
    }

    if (ballY > canvas.height) {
        // endGame();
        isGameOver = true;
    }

    console.log('drawing :3')
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    if (isGameOver) {
        endGame();
    }
    if (score % 18 === 0) {
        spawnBricks();
    }
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    spawnBricks();
    frameInterval = setInterval(step, 1 / 60 * 1000);

    gameOverAudio.play();
})
