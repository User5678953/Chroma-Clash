document.addEventListener('DOMContentLoaded', () => {
    generateAllTiles(); // This will generate and display the tiles immediately
    document.querySelector('.reset-button').addEventListener('click', () => location.reload());
    // Add an event listener to the "Start Game" button
    document.getElementById('start-game-button').addEventListener('click', startGame);
});

// Define the currentPlayerPrompt if not already defined
const currentPlayerPrompt = document.getElementById('player-prompt');

function startGame() {
    prepareNextSequence(); // Start the game sequence when the button is clicked
    document.getElementById('start-game-button').style.display = 'none'; // Optionally hide the start button
    currentPlayerPrompt.textContent = "ROUND 1"; // Update the prompt to indicate the game start
    randomizeTileBorders()
}

const colors = ['#A9A9A9', '#808080', '#696969', '#778899', '#708090', '#2F4F4F'];
const brightColors = ['#FF5733', '#07F633', '#00A782', '#FC23F1', '#26FCF2', '#FCF408', '#FFA200', '#1500F8', '#8F00FC', '#5DBEFFF8'];
let pairsOfBrightColors = generatePairsOfBrightColors();
let sequenceToMatch = [];
let playerSequence = [];
let attempts = 3;
let score = 0;
const maxRounds = 2; // Adjust based on desired game length

//randomize tile border radius
function randomizeTileBorders() {
    const tiles = document.querySelectorAll('.tile')
    const randomRadius = Math.floor(Math.random() * 101)
        console.log(randomRadius)
        //set random radius percentage for each tile
        tiles.forEach(tile => {
        tile.style.borderRadius = `${randomRadius}%`
    })
}

// Function to update the score on the webpage using the DOM reference
function updateScoreDisplay() {
    const scoreElement = document.querySelector('.score-value'); // Select the element where the score is displayed
    scoreElement.textContent = score; // Update the text content of the score element to the current score
}

function playSound(type) {
    let soundPath = '';
    switch (type) {
        case 'success':
            soundPath = 'sounds/success.mp3';
            break;
        case 'fail':
            soundPath = 'sounds/fail.mp3';
            break;
        case 'win':
            soundPath = 'sounds/duolingo correct sound.mp3'; // Ensure this path is correct
            break;
        default:
            console.error('Invalid sound type');
            return;
    }
    const sound = new Audio(soundPath);
    sound.play();
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
    setTimeout(() => {
        flashSequenceToUser(sequenceToMatch); // Flash the sequence to the user before flipping them back
    }, 1000);
}

function flashSequenceToUser(sequence) {
    sequence.forEach((index, i) => {
        setTimeout(() => {
            const tile = document.querySelectorAll('.tile')[index];
            flipTile(tile, true); // Show the color
            setTimeout(() => flipTile(tile, false), 1000); // Then hide the color after a short delay
        }, i * 1000);
    });
    setTimeout(() => {
        flipRandomTilesSequence(sequenceToMatch); // Proceed to the game logic after flashing the tiles
    }, sequence.length * 1000 + 1000); // Wait for all tiles to be shown and hidden before starting
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
    tile.dataset.flipped = show.toString();
}

function enableTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.removeEventListener('click', tileClickHandler); // Remove existing event listeners to avoid duplicates
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
        playSound('win');
        score++;
        updateScoreDisplay();
        
        if (score >= maxRounds) {
            alert('Congratulations! You won the game!');
            playSound('win');
            // Reset or offer to restart the game here
            currentPlayerPrompt.textContent = "Game Over. Congratulations!";
        } else {
            // Update this part to inform the player about the next round
            currentPlayerPrompt.textContent = `Next Round - Round ${score + 1}`; // Update the round number dynamically
            setTimeout(prepareNextSequence, 2000); // Add a delay before starting the next sequence
        }
    } else {
        alert('Not a match. Try again!');
        playSound('fail');
        attempts--;
        if (attempts <= 0) {
            alert('Game over! No more attempts left.');
            currentPlayerPrompt.textContent = "Game Over. Try again?";
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
        tile.dataset.flipped = 'false';
    });
}
