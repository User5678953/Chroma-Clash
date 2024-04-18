document.addEventListener('DOMContentLoaded', () => {
    generateAllTiles();
    document.querySelector('.reset-button').addEventListener('click', () => location.reload());
    document.getElementById('start-game-button').addEventListener('click', startGame);
});

const currentPlayerPrompt = document.getElementById('player-prompt');
let totalAttempts = 0; // To track the total number of attempts, including retries
let firstAttempt = true; // Flag to check if it's the first attempt for the current sequence

function startGame() {
    prepareNextSequence();
    document.getElementById('start-game-button').style.display = 'none';
    currentPlayerPrompt.textContent = "ROUND 1";
    randomizeTileBorders();
}

const brightColors = ['#FF5733', '#07F633', '#00A782', '#FC23F1', '#26FCF2', '#FCF408', '#FFA200', '#1500F8', '#8F00FC', '#5DBEFFF8'];
let pairsOfBrightColors = generatePairsOfBrightColors();
let sequenceToMatch = [];
let playerSequence = [];
let attempts = 3;
let score = 0;
const maxRounds = 3; // Adjusted for 3 rounds
const tilesPerRound = [4, 5, 6]; // Tiles to show per round

function randomizeTileBorders() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.style.borderRadius = `${Math.floor(Math.random() * 101)}%`;
    });
}

function updateScoreDisplay() {
    const successPercentage = totalAttempts > 0 ? (score / totalAttempts) * 100 : 0;
    document.querySelector('.score-value').textContent = `Success Rate: ${successPercentage.toFixed(2)}%`;
}

function playSound(type) {
    const sounds = {
        'success': 'sounds/success.mp3',
        'fail': 'sounds/fail.mp3',
        'win': 'sounds/aoeVictory.mp3'
    };
    if (sounds[type]) {
        new Audio(sounds[type]).play();
    } else {
        console.error('Invalid sound type');
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generatePairsOfBrightColors() {
    let pairs = [];
    brightColors.forEach(color => pairs.push(color, color));
    return shuffleArray(pairs);
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
}

function prepareNextSequence() {
    resetTiles();
    sequenceToMatch = shuffleArray([...Array(pairsOfBrightColors.length).keys()]).slice(0, tilesPerRound[score]);
    playerSequence = [];
    setTimeout(() => flashSequenceToUser(sequenceToMatch), 1000);
}

function flashSequenceToUser(sequence) {
    if (firstAttempt) {
        totalAttempts += 1; // Increase attempts count only when showing a new sequence
    }
    sequence.forEach((index, i) => {
        setTimeout(() => {
            const tile = document.querySelectorAll('.tile')[index];
            flipTile(tile, true);
            setTimeout(() => flipTile(tile, false), 1000);
        }, i * 1000);
    });
    setTimeout(() => flipRandomTilesSequence(sequenceToMatch), sequence.length * 1000 + 1000);
}

function flipRandomTilesSequence(sequence) {
    sequence.forEach((index, i) => {
        setTimeout(() => {
            const tile = document.querySelectorAll('.tile')[index];
            flipTile(tile, true);
            setTimeout(() => flipTile(tile, false), 2000);
        }, i * 500);
    });
    setTimeout(() => {
        enableTiles();
        showBanner("Your Turn!");
    }, 2000 + sequence.length * 500);
}

function flipTile(tile, show) {
    tile.style.backgroundColor = show ? tile.dataset.color : '#808080';
    tile.dataset.flipped = show.toString();
}

function enableTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.removeEventListener('click', tileClickHandler);
        tile.addEventListener('click', tileClickHandler);
    });
}

function tileClickHandler() {
    if (this.dataset.flipped === 'true' || playerSequence.length >= tilesPerRound[score]) return;
    this.dataset.flipped = 'true';
    flipTile(this, true);
    playerSequence.push(parseInt(this.dataset.index));
    if (playerSequence.length === tilesPerRound[score]) {
        setTimeout(checkSequenceMatch, 500);
    }
}

function checkSequenceMatch() {
    if (sequenceToMatch.length === playerSequence.length && sequenceToMatch.every((value, index) => value === playerSequence[index])) {
        if (firstAttempt) {
            score++;
        }
        updateScoreDisplay();
        if (score >= maxRounds) {
            alert('Congratulations! You won the game!');
            playSound('win');
            currentPlayerPrompt.textContent = "Game Over. Congratulations!";
        } else {
            currentPlayerPrompt.textContent = `Next Round - Round ${score + 1}`;
            firstAttempt = true; // Reset for the next sequence
            setTimeout(prepareNextSequence, 2000);
        }
    } else {
        currentPlayerPrompt.textContent = 'Not a match. Try again!';
        playSound('fail');
        firstAttempt = false; // Mark this as a retry attempt
        setTimeout(() => {
            resetTiles();
            playerSequence = [];
            setTimeout(() => flashSequenceToUser(sequenceToMatch), 1000); // Re-show the same sequence
            showBanner('Not a match. Try again!');
        }, 1000);
    }
}

function resetTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        flipTile(tile, false);
        tile.dataset.flipped = 'false';
    });
}

function showBanner(message) {
    let banner = document.getElementById('turn-banner');
    if (!banner) {
        banner = createBanner();
    }
    banner.textContent = message;
    banner.style.display = 'block';
    requestAnimationFrame(() => {
        banner.style.opacity = '1';
        setTimeout(() => {
            banner.style.opacity = '0';
            setTimeout(() => {
                banner.style.display = 'none';
            }, 2000);
        }, 1500);
    });
}

function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'turn-banner';
    document.body.appendChild(banner);
    banner.style.cssText = "position: absolute; top: 20%; width: 100%; text-align: center; font-size: 2em; color: white; background-color: rgba(0, 0, 0, 0.7); padding: 10px; z-index: 10; display: none;";
    return banner;
}

