//window on load to change background and randomize tile borders
document.addEventListener('DOMContentLoaded', () => {
    randomizeTileBorders()
    changeBackgroundcolor()
    currentPlayerPrompt.textContent = "Pick a tile, any tile!"
})

//Variables
const player1 = {
    score: 0,
    name: 'Player 1'
}

const player2 = {
    score: 0,
    name: 'Player 2'
}

//Player Phrases Prompt
const funPhrases = [
    "{player}, pair up!",
"{player}, meet your match!",
"{player}, double or nothing!",
"{player}, it's tile time!",
"{player}, match point!",
"{player}, seek and pair!",
"{player}, twin tiles await!",
"{player}, match to master!",
"{player}, two's the charm!",
"{player}, find the twin!",
"{player}, pair-fect play!",
"{player}, match on!",
"{player}, tile and trial!",
"{player}, memory matchup!"
]

//Tile Count
const totalTiles = 20

//default player turn on game start
let currentPlayer = player1

//Dom references for score and prompt
const player1ScoreElement = document.getElementById('player1-score')
const player2ScoreElement = document.getElementById('player2-score')
const currentPlayerPrompt = document.getElementById('player-prompt')

// DOM Listener
document.addEventListener('DOMContentLoaded', () => {
    changeBackgroundcolor();
    generateAllTiles();
    assignTileColors();
    addClickHandlersToTiles();
    currentPlayerPrompt.textContent = "Pick a tile, any tile!";
});


//Utility Functions

//Return random player prompt
function getRandomPrompt(playerName) {
    const randomIndex = Math.floor(Math.random() * funPhrases.length)
    return funPhrases[randomIndex].replace('{player}', playerName)
}

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

// Shuffle the array using Fisher-Yates algorithm to shuffle the colors each reset
let j
function shuffleArray(array) {
    console.log("Before shuffle:", array);
   
    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        console.log(`Swapping position ${i} with position ${j}`);
        [array[i], array[j]] = [array[j], array[i]]
    }
    console.log("After shuffle:", array);
}

//Color Generation and assignment 

//generate pairs of colors and store them in array using shuffle function
function generatePairsOfBrightColors (){
    const brightColors = ['#FF5733', '#07F633', '#00A782', '#FC23F1', '#26FCF2', '#FCF408','#FFA200','#1500F8','#8F00FC','#5DBEFFF8']                     
    const pairs = []    

    for (const color of brightColors) {
        pairs.push(color,color)
    }
    shuffleArray(pairs)
    return pairs
}

// Generate random gray and bright colors once and store them in arrays
const randomGrayColor = Array.from({ length: totalTiles }, setRandomGrayColor)
const pairsOfBrightColors =generatePairsOfBrightColors()

//random Gray color for unflipped tile
function setRandomGrayColor(){
    const grayColors = ['#A9A9A9', '#808080', '#696969', '#778899', '#708090', '#2F4F4F', '#F0F0F0', '#D0D0D0', '#B0B0B0', '#909090', '#707070', '#505050']
    const randomColorIndex = Math.floor(Math.random() * grayColors.length)
    return grayColors[randomColorIndex]
}

//Tile Generation

//Generate tiles
function generateAllTiles() {
    const tilesContainer = document.querySelector('.tiles-container');
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tilesContainer.appendChild(tile);
    }
}

generateAllTiles()



function assignTileColors() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        // Assigning colors and other data attributes here
    });
}

function addClickHandlersToTiles() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', tileClickHandler);
    });
}

//Generate tile new tile with 
    function generateTile(index) {
        const tile = document.createElement('div')
        tile.classList.add('tile')

    //Initial state, unflipped
    tile.dataset.flipped = false

    // Store original gray color in a data attribute
    tile.dataset.originalColor = randomGrayColor[index]
    tile.style.backgroundColor = randomGrayColor[index]
    return tile
}


// Scoring and Attempts Tracking
let attempts = 3; // Starting attempts

function updateAttempts(isMatch) {
    if (!isMatch) {
        attempts--;
        updateHeartsDisplay(); // Implement this function to visually update hearts
        if (attempts <= 0) {
            alert("Out of attempts! Game over.");
            // Reset game or offer a restart
        }
    }
}

function updateScore() {
    currentPlayer.score += 1;
    if (currentPlayer === player1) {
        player1ScoreElement.textContent = currentPlayer.score;
    } // Adjust according to your game logic
}


//Game logic

//switch player logic
function switchPlayer(){
    currentPlayer = (currentPlayer === player1) ? player2: player1
    const saying = getRandomPrompt(currentPlayer.name);
    currentPlayerPrompt.textContent = saying; 
} 

// Algorithm for flipping tiles
function flipRandomTiles() {
    const unflippedTiles = Array.from(document.querySelectorAll('.tile')).filter(tile => !tile.dataset.flipped && !tile.classList.contains('matched'));
    const randomTiles = unflippedTiles.sort(() => 0.5 - Math.random()).slice(0, 4);
    const flipBackDelay = 2000; // 2 seconds before flipping back

    randomTiles.forEach(tile => {
        const colorIndex = Array.from(document.querySelectorAll('.tile')).indexOf(tile);
        const color = pairsOfBrightColors[colorIndex];
        tile.style.backgroundColor = color;
        tile.dataset.flipped = 'true';
    });

    setTimeout(() => {
        randomTiles.forEach(tile => {
            tile.style.backgroundColor = tile.dataset.originalColor;
            tile.dataset.flipped = 'false';
        });
    }, flipBackDelay);
}




//Match Logic

function checkSequenceMatch(selectedTiles, algorithmTiles) {
    // Assuming algorithmTiles is an array of tile elements shown by the algorithm
    const playerSequenceMatches = selectedTiles.every((tile, index) => tile === algorithmTiles[index]);

    if (playerSequenceMatches) {
        console.log('Sequence match!');
         // Update score
         currentPlayer.score += 1
         soundPlayer.playSound('success');
        } else {
            console.log('Sequence does not match!');
            soundPlayer.playSound('fail');
            //Handle attempts
        }
    }

        // Disable all tiles
        tiles.forEach(tile => tile.style.pointerEvents = 'none')

        // Delay before resetting colors
        setTimeout(() => {
            //reset colors with delay
            tile1.style.backgroundColor = tile1.dataset.originalColor
            tile2.style.backgroundColor = tile2.dataset.originalColor
        
            //Reset flipped state
            tile1.dataset.flipped = 'false'
            tile2.dataset.flipped = 'false'
        
            // Re-enable all tiles
            tiles.forEach(tile => tile.style.pointerEvents = 'auto')
        }, 1075); 
    }       
            //check win condition 
            checkWinCondition()

            //switch player turn
            switchPlayer()
}


//NEED TO UPDATE WIN CONDITION
//Check win condition function
function checkWinCondition () {
    const totalMatchesNeeded = totalTiles / 2

    //check current player score
    if (player1.score + player2.score === totalMatchesNeeded){

        //player 1 win scenario
        if (player1.score > player2.score) {
            currentPlayerPrompt.textContent = 'Player 1 wins!'
        
        //player 2 win scenraio
        } else if (player2.score > player1.score) {
            currentPlayerPrompt.textContent = 'Player 2 wins!'
            
        //player tie
        } else {
            currentPlayerPrompt.textContent = "It's a Tie!"
        }

    }
}

const tiles = document.querySelectorAll('.tile')
//store user selection
let selectedTiles =[]
 
//Event handers for click

//Add click Event handler to each tile
tiles.forEach((tile) => {
    tile.addEventListener('click', tileClickHandler)
})
    
//tile click handler
    function tileClickHandler() {
        if (this.classList.contains('matched') || this.classList.contains('clicked')) {
            console.log('Matched tile clicked, skipping')
            return
        }

        console.log('Regular tile clicked, processing')

        const color = pairsOfBrightColors[Array.from(tiles).indexOf(this)]
        if (this.dataset.flipped === 'false') {
            this.dataset.flipped = 'true';
            this.style.backgroundColor = color;
        } else {
            this.dataset.flipped = 'false';
            this.style.backgroundColor = this.dataset.originalColor
        }

        if (selectedTiles.length < 4) {
                selectedTiles.push(this)
                this.style.border = '5px solid #006767'
                this.classList.add('clicked')
            }
    
        if (selectedTiles.length === 4) {
            
            tiles.forEach(tile => tile.classList.add('clicked'))
    
            checkColorMatch(selectedTiles[0], selectedTiles[1], tiles)
            
            //reset tiles
            selectedTiles.forEach((selectedTile) => {
                selectedTile.style.border = '5px solid #fff'
                selectedTile.classList.remove('clicked')
            })

            // Enable all unmatched tiles to be clicked again
            tiles.forEach(tile => {
                if (!tile.classList.contains('matched')) {
                    tile.classList.remove('clicked')
                }
            })
            
            selectedTiles = []
            
            //check the win condition with function
            checkWinCondition()
         }

    }

