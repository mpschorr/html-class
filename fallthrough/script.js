const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const COLOR_BG = 'rgb(189, 229, 249)';
const COLOR_BALL = 'rgb(7, 114, 181)';
const COLOR_LINE = 'rgb(11, 131, 207)';

let speed = 1.5;
const lines = [];

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
// let ballAccel = 1.01;
let ballVX = 0;

// Spawn a line
function spawnLine() {
  lines.push({
    x: 0,
    y: canvas.clientHeight,
    width: canvas.width,
    height: 30,
    gap: {
      x: Math.floor(Math.random() * (canvas.width - 50)),
      // Draw the fake gap on top of the line
      draw() {
        ctx.beginPath();
        ctx.fillStyle = COLOR_BG;
        ctx.fillRect(this.gap.x, this.y - 2.5, 50, this.height + 5);
      },
    },
    // Draw the actual line & a "fake" gap on top
    draw() {
      ctx.beginPath();
      ctx.fillStyle = COLOR_LINE;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.gap.draw.bind(this)();
      this.y -= speed;
    },
  });
}

function drawLines() {
  lines.forEach((line) => {
    line.draw.bind(line)();
  });
}

// Check if line is far enough away to spawn a new one
function addLines() {
  if (lines[lines.length - 1].y < canvas.height - 100) {
    spawnLine();
  }
}

// Check if line is above canvas & can be deleted
function deleteLine() {
  if (lines[0].y < -lines[0].height) {
    lines.shift();
  }
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fillStyle = COLOR_BALL;
  ctx.fill();
}

// window.

// Key input
window.onkeydown = (e) => {
  if (e.key === 'ArrowLeft' && ballVX >= 0) {
    ballVX -= 1;
  }
  if (e.key === 'ArrowRight' && ballVX <= 0) {
    ballVX += 1;
  }
};

window.onkeyup = (e) => {
  if (e.key === 'ArrowLeft') {
    ballVX += 1;
  }
  if (e.key === 'ArrowRight') {
    ballVX -= 1;
  }
};

// Animate frame
function animate() {
  // Movement
  ballX += ballVX;
  if (ballX < 0) ballX = canvas.width;
  if (ballX > canvas.width) ballX = 0;
  // Clear canvas & draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines();
  drawBall();
  // Handle line lifecycle
  addLines();
  deleteLine();
  // Re-call animate on next frame
  requestAnimationFrame(animate);
}

spawnLine();
animate();
