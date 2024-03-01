//window on load to change background and randomize tile borders
document.addEventListener('DOMContentLoaded', () => {
    randomizeTileBorders();
    changeBackgroundcolor();
    currentPlayerPrompt.textContent = "Pick a tile, any tile!";
});

// Variables
const player = {
    score: 0,
    name: 'Player'
};

// Player Phrases Prompt
const funPhrases = [
    "Pair up!",
    "Meet your match!",
    "Double or nothing!",
    "It's tile time!",
    "Match point!",
    "Seek and pair!",
    "Twin tiles await!",
    "Match to master!",
    "Two's the charm!",
    "Find the twin!",
    "Pair-fect play!",
    "Match on!",
    "Tile and trial!",
    "Memory matchup!"
];

// Tile Count
const totalTiles = 20;

// Dom references for score and prompt
const playerScoreElement = document.getElementById('player-score');
const currentPlayerPrompt = document.getElementById('player-prompt');

// Utility Functions

// Return random player prompt
function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * funPhrases.length);
    return funPhrases[randomIndex];
}

// Game logic

// Match Logic
function checkColorMatch(tile1, tile2) {
    // Assuming this function checks if two tiles match and updates the UI and score accordingly
    // If match, increment player score and update UI
    if (/* condition to check match */) {
        player.score++;
        playerScoreElement.textContent = `Score: ${player.score}`;
        // Update prompt with a fun phrase
        currentPlayerPrompt.textContent = getRandomPrompt();
    } else {
        // Handle non-match scenario, possibly resetting some state or providing feedback
    }
    checkWinCondition(); // Check if the win condition is met after each match attempt
}

// Check win condition function
function checkWinCondition() {
    const totalMatchesNeeded = totalTiles / 2;
    if (player.score === totalMatchesNeeded) {
        currentPlayerPrompt.textContent = `${player.name} wins! All matches made.`;
        // Here, you can add any additional end-of-game logic, such as disabling further actions or showing a restart option
    }
}

// Randomize tile borders, color generation, and other setup functions as previously defined

// Remember to adjust your HTML and any event listeners to align with the single-player logic, ensuring interactions are handled according to the updated game mechanics.
