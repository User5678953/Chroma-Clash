document.addEventListener('DOMContentLoaded', () => {
    generateAllTiles();
    document.querySelector('.reset-button').addEventListener('click', () => location.reload());
    document.getElementById('start-game-button').addEventListener('click', startGame);
    document.getElementById('timerToggle').addEventListener('change', toggleTimer); // Match HTML ID

    // Additional setup or functions if needed
});

const brightColors = ['#FF5733', '#07F633', '#00A782', '#FC23F1', '#26FCF2', '#FCF408', '#FFA200', '#1500F8', '#8F00FC', '#5DBEFFF8'];
let pairsOfBrightColors = generatePairsOfBrightColors();
let sequenceToMatch = [];
let playerSequence = [];
let attempts = 3;
let score = 0;
const maxRounds = 2;
let isTimerEnabled = false;
let timerDuration = 30;
let currentTimer;
const timerDisplay = document.getElementById('timer-display'); // Ensure this ID matches your HTML

function toggleTimer() {
    isTimerEnabled = document.getElementById('timerToggle').checked; // Ensure this ID matches your HTML
    if (!isTimerEnabled) {
        stopTimer();
    }
}

function startGame() {
    prepareNextSequence();
    document.getElementById('start-game-button').style.display = 'none';
    document.getElementById('player-prompt').textContent = "Round 1";
    if (isTimerEnabled) {
        startTimer();
    }
}

function startTimer() {
    let timeLeft = timerDuration;
    timerDisplay.style.display = 'block'; // Make sure the timer display is shown
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    currentTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            alert('Time is up! Try again.');
            handleRoundEnd(true);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(currentTimer);
    timerDisplay.style.display = 'none'; // Hide the timer display
}

function handleRoundEnd(timeout = false) {
    if (!timeout) {
        stopTimer();
    }
    attempts--;
    if (attempts <= 0 || timeout) {
        alert('Game over! No more attempts left.');
        location.reload(); // Reset the game
    } else {
        prepareNextSequence();
    }
}

function generatePairsOfBrightColors() {
    const pairs = [];
    brightColors.forEach(color => pairs.push(color, color));
    return shuffleArray(pairs);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateAllTiles() {
    const tilesContainer = document.querySelector('.tiles-container');
    tilesContainer.innerHTML = '';
    pairsOfBrightColors.forEach((color, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.color = color;
        tile.dataset.index = index;
        tile.style.backgroundColor = '#808080';
        tilesContainer.appendChild(tile);
    });
    enableTiles();
}

function prepareNextSequence() {
    resetTiles();
    sequenceToMatch = shuffleArray([...Array(pairsOfBrightColors.length).keys()]).slice(0, 4);
    playerSequence = [];
    setTimeout(() => {
        flashSequenceToUser(sequenceToMatch);
    }, 1000);
}

function resetTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.style.backgroundColor = '#808080';
        tile.dataset.flipped = 'false';
    });
    playerSequence = [];
}

function flashSequenceToUser(sequence) {
    sequence.forEach((index, i) => {
        setTimeout(() => {
            const tile = document.querySelectorAll('.tile')[index];
            flipTile(tile, true);
            setTimeout(() => flipTile(tile, false), 500);
        }, i * 1000);
    });
}

function flipTile(tile, show) {
    tile.style.backgroundColor = show ? tile.dataset.color : '#808080';
    tile.dataset.flipped = show.toString();
}

function enableTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', tileClickHandler);
    });
}

function tileClickHandler() {
    if (this.dataset.flipped === 'true' || playerSequence.length >= sequenceToMatch.length) return;
    flipTile(this, true);
    playerSequence.push(parseInt(this.dataset.index));
    if (playerSequence.length === sequenceToMatch.length) {
        setTimeout(checkSequenceMatch, 500);
    }
}

function checkSequenceMatch() {
    const sortedSequenceToMatch = sequenceToMatch.sort((a, b) => a - b);
    const sortedPlayerSequence = playerSequence.sort((a, b) => a - b);
    if (JSON.stringify(sortedSequenceToMatch) === JSON.stringify(sortedPlayerSequence)) {
        score++;
        if (score >= maxRounds) {
            alert('Congratulations! You won the game!');
            stopTimer(); // Game won, stop the timer
            // Optionally, offer to restart or end the game
        } else {
            alert('Match! Well done.');
            prepareNextSequence();
        }
    } else {
        alert('Not a match. Try again!');
        handleRoundEnd();
    }
}
