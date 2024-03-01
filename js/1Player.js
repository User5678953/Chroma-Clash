//window on load to change background and randomize tile borders
document.addEventListener('DOMContentLoaded', () => {
    randomizeTileBorders()
    changeBackgroundcolor()
    currentPlayerPrompt.textContent = ""
})

//Variables
const player1 = {
    score: 0,
    name: 'Player'
}

//Player Phrases Prompt
const funPhrases = [
    "Great Job!",
    "Awesome Match!",
    "You're on Fire!",
    "Incredible!",
    "Wow, Nice Find!",
    "Keep it Up!",
    "Fantastic!",
    "Brilliant Move!",
    "Superb!",
    "Unstoppable!",
    "Wonderful!",
    "You've Got the Eye!",
    "Perfect Match!",
    "Impressive!",
    "You're Rocking This!",
    "Spectacular!",
    "Genius!",
    "That's Right!",
    "You're Smashing It!",
    "Magnificent!",
    "You're a Natural!",
    "Stupendous!",
    "Keep the Streak Going!",
    "You're Killing It!",
    "Phenomenal!",
    "Marvelous!",
    "Way to Go!",
    "You're a Genius!",
    "Outstanding!",
    "Champion Move!",
    "Epic!",
    "You're a Star!",
    "Masterful!"
]

//Player Phrases Prompt
const WinPhrases = [
    "Victory is Yours!",
    "Champion of Champions!",
    "Unbeatable Master!",
    "All Hail the Victor!",
    "Triumph Achieved!",
    "You've Conquered It All!",
    "Legend in the Making!",
    "Master of the Game!",
    "Ultimate Winner!",
    "The Crown is Yours!",
    "Supreme Victor!",
    "You Rule the Game!",
    "Top of the World!",
    "Glory Unmatched!",
    "Simply Unstoppable!",
    "Peak Performance!",
    "Game, Set, Match - You Win!",
    "You're the Hero of This Story!",
    "Epic Win!",
    "Nothing Can Stop You Now!",
    "A Stellar Victory!",
    "The Ultimate Achievement!",
    "You've Reached the Summit!",
    "King/Queen of the Arena!",
    "Your Name is in the History Books!",
    "A Legendary Triumph!",
    "You've Done the Impossible!",
    "Beyond Legendary!",
    "You Own the Throne!",
    "Masterpiece Achieved!",
    "Your Victory Will Be Remembered!",
    "Immortalized in Victory!",
    "You've Set a New Standard!",
    "The Champion's Champion!",
    "A Victory for the Ages!",
    "In a League of Your Own!"
]

//Tile Count
const totalTiles = 20

//default player turn on game start
let currentPlayer = player1

//Dom references for score and prompt
const player1ScoreElement = document.getElementById('player1-score')
const currentPlayerPrompt = document.getElementById('player-prompt')

//Utility Functions

//Return random player prompt
function getRandomPrompt(playerName) {
    const randomIndex = Math.floor(Math.random() * funPhrases.length)
    return funPhrases[randomIndex].replace('{player}', playerName)
}

//Return random Victory Alert
function getVictoryPrompt(playerName) {
    const randomIndex = Math.floor(Math.random() * funPhrases.length)
    return WinPhrases[randomIndex].replace('{player}', playerName)
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
function generateAllTiles(){
    console.log('this is bright pairs', pairsOfBrightColors)
    const tilesContainer = document.querySelector('.tiles-container')
        
    //Assign Random Pair of Colors and append to tiles-container
    for (let i=0; i < totalTiles; i++){
        const tile = generateTile(i, pairsOfBrightColors[i]) 
        tilesContainer.appendChild(tile)
    }
}

generateAllTiles()

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

//Game logic

function checkColorMatch(tile1, tile2) {
    const color1 = tile1.style.backgroundColor;
    const color2 = tile2.style.backgroundColor;

    console.log(`Checking color match: ${color1} and ${color2}`);

    if (color1 === color2) {
        console.log('Matched');
        player1.score++;
        
        // Display random prompt for currentPlayer immediately upon match
        const saying = getRandomPrompt(currentPlayer.name);
        currentPlayerPrompt.textContent = saying;
    
        // Clear the prompt text after a delay
        setTimeout(() => {
            currentPlayerPrompt.textContent = ''; 
        }, 2000);
    
        [tile1, tile2].forEach(tile => {
            tile.classList.add('matched');
            tile.removeEventListener('click', tileClickHandler);
        });
    } else {
        console.log('No match');
        // Temporarily disable all tiles to prevent further clicks during the reset delay
        document.querySelectorAll('.tile').forEach(tile => tile.style.pointerEvents = 'none');

        setTimeout(() => {
            tile1.style.backgroundColor = tile1.dataset.originalColor;
            tile2.style.backgroundColor = tile2.dataset.originalColor;
            tile1.dataset.flipped = 'false';
            tile2.dataset.flipped = 'false';

            // Re-enable tile selection for all unmatched tiles
            document.querySelectorAll('.tile:not(.matched)').forEach(tile => {
                tile.style.pointerEvents = 'auto';
            });
        }, 750); // Adjust delay as necessary
    }

    // Check win condition
    checkWinCondition();
}

// Update the checkWinCondition function to reflect single-player logic
function checkWinCondition() {
    const matchedTiles = document.querySelectorAll('.tile.matched').length;
    if (matchedTiles === totalTiles) {

    // Display WinPhrases for currentPlayer immediately upon matchend
    const VictoryAlert = getVictoryPrompt(currentPlayer.name);
    currentPlayerPrompt.textContent = VictoryAlert;

     // Clear the prompt text after a delay
     setTimeout(() => {
        currentPlayerPrompt.textContent = ''; 
    }, 4000);

    // Set a timeout to prompt the player to play again, making currentPlayerPrompt clickable to restart the game
    setTimeout(() => {
        currentPlayerPrompt.textContent = 'Play Again? Click here to restart!';
        currentPlayerPrompt.style.cursor = 'pointer'; // Change the cursor to indicate clickable

        // Add click event listener to currentPlayerPrompt to restart the game
        currentPlayerPrompt.addEventListener('click', function restartGameOnClick() {
            location.reload(); // Reload the page to reset the game
            // Important to remove this event listener if the game is not being reloaded to prevent multiple bindings
            currentPlayerPrompt.removeEventListener('click', restartGameOnClick);
        });
    }, 5000); // Delay of 5000ms (5 seconds) before showing the play again prompt
}
}
const tiles = document.querySelectorAll('.tile')
//store user selection
let selectedTiles =[]
 
// //Event handers for click

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

        if (selectedTiles.length < 2) {
                selectedTiles.push(this)
                this.style.border = '5px solid #006767'
                this.classList.add('clicked')
            }
    
        if (selectedTiles.length === 2) {
            
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

