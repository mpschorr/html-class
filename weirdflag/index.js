const canvas = document.getElementById('flaggie');
const ctx = canvas.getContext('2d');

// ctx.rect(50, 50, )

ctx.fillStyle = 'green';
ctx.fillRect(50, 50, 400, 200)

ctx.beginPath();
ctx.fillStyle = 'white';
ctx.arc(250, 150, 75, 0, Math.PI * 2)
ctx.fill();

ctx.beginPath();
ctx.fillStyle = 'green';
ctx.arc(285, 150, 75, 0, Math.PI * 2)
ctx.fill();