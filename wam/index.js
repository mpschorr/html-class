const squares = document.querySelectorAll('.square');
let score = 0;
let time = 20;
let molePosition;

const myScore = 53;

let moleInterval;
let countdownInterval;

squares.forEach(function (square) {
    square.addEventListener('mousedown', function (event) {
        console.log(molePosition, square.id)
        if (square.id == molePosition && time > 0) {
            score++;
            document.getElementById('score').innerHTML = score;

            spawnMole();
            clearInterval(moleInterval);
            moleInterval = setInterval(spawnMole, 1000);
        }
    });
});

function clearMole() {
    squares.forEach(function (square) {
        square.classList.remove('mole');
    })
}

function spawnMole() {
    clearMole();
    molePosition = Math.floor(Math.random() * 9) + 1;
    document.getElementById(molePosition).classList.add('mole');
}

moleInterval = setInterval(spawnMole, 1000);

// Timer

function countdown() {
    time--;
    document.getElementById('time').innerHTML = time;
    if (time < 1) {
        clearInterval(countdownInterval);
        clearInterval(moleInterval);
        document.getElementById("grid").classList.add('hidden');
        if (score >= myScore) {
            // ...
            document.getElementById("win").classList.remove('hidden');
        } else {
            document.getElementById("lose").classList.remove('hidden');
        }
    }
}

countdownInterval = setInterval(countdown, 1000);