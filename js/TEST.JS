document.addEventListener('DOMContentLoaded', () => {
    changeBackgroundcolor();
    generateAllTiles();
    document.querySelector('.reset-button').addEventListener('click', () => location.reload());
    prepareNextSequence();
});

const colors = ['#A9A9A9', '#808080', '#696969', '#778899', '#708090', '#2F4F4F'];
const brightColors = ['#FF5733', '#07F633', '#00A782', '#FC23F1', '#26FCF2', '#FCF408', '#FFA200', '#1500F8', '#8F00FC', '#5DBEFFF8'];
let pairsOfBrightColors = generatePairsOfBrightColors();
let sequenceToMatch = [];
let playerSequence = [];
let attempts = 3;
let score = 0;
const maxRounds = 2; // Adjust based on desired game length


function playSound(type) {
    let soundPath = '';
    switch(type) {
        case 'success':
            soundPath = 'sounds/success.mp3';
            break;
        case 'fail':
            soundPath = 'sounds/fail.mp3';
            break;
        case 'win':
            soundPath = '/duolingo correct sound.mp3';
            break;
    }
    if (soundPath) {
        const sound = new Audio(soundPath);
        sound.play();
    }
}


function changeBackgroundcolor() {
    const body = document.querySelector('body');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    body.style.backgroundColor = randomColor;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generatePairsOfBrightColors() {
    const pairs = [];
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
    sequenceToMatch = shuffleArray([...Array(pairsOfBrightColors.length).keys()]).slice(0, 4);
    playerSequence = [];
    setTimeout(() => flipRandomTilesSequence(sequenceToMatch), 1000);
}

function flipRandomTilesSequence(sequence) {
    sequence.forEach((index, i) => {
        setTimeout(() => {
            const tile = document.querySelectorAll('.tile')[index];
            flipTile(tile, true);
            setTimeout(() => flipTile(tile, false), 2000);
        }, i * 500);
    });
    setTimeout(() => enableTiles(), 2000 + sequence.length * 500);
}

function flipTile(tile, show) {
    tile.style.backgroundColor = show ? tile.dataset.color : '#808080';
    if (!show) tile.dataset.flipped = 'false';
}

function enableTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', tileClickHandler);
    });
}

function tileClickHandler() {
    if (this.dataset.flipped === 'true' || playerSequence.length >= 4) return;
    this.dataset.flipped = 'true';
    flipTile(this, true);
    playerSequence.push(parseInt(this.dataset.index));
    if (playerSequence.length === 4) {
        setTimeout(checkSequenceMatch, 500);
    }
}

function checkSequenceMatch() {
    if (JSON.stringify(sequenceToMatch.sort()) === JSON.stringify(playerSequence.sort())) {
        alert('Match! Well done.');
        soundPlayer.playSound('win');
        score++;
        if (score >= maxRounds) {
            alert('Congratulations! You won the game!');
            playSound('win');
            //soundPlayer.playSound('win');
            // Optionally reset the game or increase difficulty
        } else {
            prepareNextSequence();
        }
    } else {
        alert('Not a match. Try again!');
        soundPlayer.playSound('fail');
        attempts--;
        if (attempts <= 0) {
            alert('Game over! No more attempts left.');
            // Optionally offer a restart here
        } else {
            playerSequence = [];
            resetTiles();
            setTimeout(() => flipRandomTilesSequence(sequenceToMatch), 1000);
        }
    }
}

function resetTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        flipTile(tile, false);
        tile.dataset.flipped = 'false'; // Reset the flipped state
    });
}
