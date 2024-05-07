const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const lines = [];

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
      draw(y) {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(189, 229, 249)';
        ctx.fillRect(this.x, y, 50, 30);
      },
    },
    // Draw the actual line & a "fake" gap on top
    draw() {
      ctx.beginPath();
      ctx.fillStyle = 'rgb(11, 131, 207)';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.gap.draw(this.y);
      this.y--;
    },
  });
}

function drawLines() {
  lines.forEach((line) => line.draw());
}

// Animate frame
function animate() {
  // Clear canvas & draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines();
  // Re-call animate on next frame
  requestAnimationFrame(animate);
}

spawnLine();
animate();
