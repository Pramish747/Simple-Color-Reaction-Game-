const container = document.getElementById('container');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const timerDisplay = document.getElementById('timer');
const targetColorDisplay = document.getElementById('targetColor');

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let time = 30;
let moveSpeed = 1500;
let boxInterval;
const colors = ['red', 'orange', 'green', 'blue', 'purple', 'pink', 'yellow'];

highScoreDisplay.textContent = highScore;

let targetColor = colors[Math.floor(Math.random() * colors.length)];
targetColorDisplay.textContent = capitalize(targetColor);

function createBoxes() {
    container.innerHTML = '';
    colors.forEach(color => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.backgroundColor = color;

        container.appendChild(box);

        box.addEventListener('click', () => {
            if (box.style.backgroundColor === targetColor) {
                score++;
                scoreDisplay.textContent = score;

                if (score > highScore) {
                    highScore = score;
                    highScoreDisplay.textContent = highScore;
                    localStorage.setItem('highScore', highScore);
                }

                if (score % 5 === 0 && moveSpeed > 400) {
                    moveSpeed -= 100;
                    clearInterval(boxInterval);
                    moveBoxes();
                }

                const randomIndex = Math.floor(Math.random() * colors.length);
                targetColor = colors[randomIndex];
                targetColorDisplay.textContent = capitalize(targetColor);
            }
        });
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function moveBoxes() {
    const boxElements = document.querySelectorAll('.box');
    boxInterval = setInterval(() => {
        boxElements.forEach(box => {
            const containerRect = container.getBoundingClientRect();
            const boxSize = box.offsetWidth;
            const maxX = containerRect.width - boxSize;
            const maxY = containerRect.height - boxSize;

            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            box.style.left = `${x}px`;
            box.style.top = `${y}px`;
            box.style.position = 'absolute';
        });
    }, moveSpeed);
}

function startGame() {
    createBoxes();
    moveBoxes();

    const timerInterval = setInterval(() => {
        time--;
        timerDisplay.textContent = time;
        if (time <= 0) {
            clearInterval(timerInterval);
            clearInterval(boxInterval);
            alert(`Time's up! Your score: ${score}`);
        }
    }, 1000);
}

startGame();
