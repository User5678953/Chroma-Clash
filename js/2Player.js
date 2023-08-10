document.addEventListener('DOMContentLoaded', () => {
    randomizeTileBorders()
    changeBackgroundcolor()
    currentPlayerPrompt.textContent = "Pick a tile, any tile!"
})

const player1 = {
    score: 0,
    name: 'Player 1'
}

const player2 = {
    score: 0,
    name: 'Player 2'
}

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

//randomize tile border
function randomizeTileBorders() {
    const tiles = document.querySelectorAll('.tile')
    const randomRadius = Math.floor(Math.random() * 101)
        console.log(randomRadius)
        tiles.forEach(tile => {
        tile.style.borderRadius = `${randomRadius}%`
    })
}

//Dom references for score and prompt
const player1ScoreElement = document.getElementById('player1-score')
const player2ScoreElement = document.getElementById('player2-score')
const currentPlayerPrompt = document.getElementById('player-prompt')

//default player turn
let currentPlayer = player1

function getRandomPrompt(playerName) {
    const randomIndex = Math.floor(Math.random() * funPhrases.length)
    return funPhrases[randomIndex].replace('{player}', playerName)
}

//switch player logic
function switchPlayer(){
    currentPlayer = (currentPlayer === player1) ? player2: player1
    const saying = getRandomPrompt(currentPlayer.name);
    currentPlayerPrompt.textContent = saying; 
}

const totalTiles = 24

// Generate random gray and bright colors once and store them in arrays
const randomGrayColor = Array.from({ length: totalTiles }, setRandomGrayColor)
const pairsOfBrightColors =generatePairsOfBrightColors()

    //for loop to iterate totalTiles and genrate multiple  
    function generateAllTiles(){
        console.log('this is bright pairs', pairsOfBrightColors)
        const tilesContainer = document.querySelector('.tiles-container')
        
        for (let i=0; i < totalTiles; i++){
            const tile = generateTile(i, pairsOfBrightColors[i]) 
            tilesContainer.appendChild(tile)
        }
    }

    generateAllTiles()

// Shuffle the array using Fisher-Yates algorithm
function shuffleArray(array) {
    console.log("Before shuffle:", array);
    let j
    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        console.log(`Swapping position ${i} with position ${j}`);
        [array[i], array[j]] = [array[j], array[i]]
    }
    console.log("After shuffle:", array);
}

//generate pairs of colors 
function generatePairsOfBrightColors (){
    const brightColors = ['#FF5050', '#00FFFF', '#9933FF', '#ADFF2F', '#1E90FF', '#FF0099', '#00CED1', '#FFCC00', '#BA55D3', '#20B2AA', '#FF6633', '#9370DB']                     
    const pairs = []

    for (const color of brightColors) {
        pairs.push(color,color)
    }
    shuffleArray(pairs)
    return pairs
}

//random color for flipped tile
function setRandomBrightColor(){
    const brightColors =  ['#007BFF', '#FF0000', '#28A745', '#FFC107', '#6F42C1', '#FD7E14']
    const randomColorIndex = Math.floor(Math.random() * brightColors.length)
    return brightColors[randomColorIndex]
}

//random Gray color for unflipped tile
function setRandomGrayColor(){
    const grayColors = ['#A9A9A9', '#808080', '#696969', '#778899', '#708090', '#2F4F4F', '#F0F0F0', '#D0D0D0', '#B0B0B0', '#909090', '#707070', '#505050']
    const randomColorIndex = Math.floor(Math.random() * grayColors.length)
    return grayColors[randomColorIndex]
}

//generate tile initially 
function generateTile(index, color) {
    const tile = document.createElement('div')
    tile.classList.add('tile')

    //Initial state, unflipped
    tile.dataset.flipped = false

    // Store original gray color in a data attribute
    tile.dataset.originalColor = randomGrayColor[index]
    tile.style.backgroundColor = randomGrayColor[index]
    return tile
}

//Match Logic

function checkColorMatch (tile1, tile2, tiles) {
    const color1 = tile1.style.backgroundColor
    const color2 = tile2.style.backgroundColor

        console.log(`Checking color match: ${color1} and ${color2}`)

    //match found
    if (color1 === color2) {
            console.log('matched')

        // Update score
        currentPlayer.score += 1

        if(currentPlayer === player1) {
            document.querySelector("#player1-score .score-value").textContent = currentPlayer.score
        } else {
            document.querySelector("#player2-score .score-value").textContent = currentPlayer.score
        }

        //add matched class
        tile1.classList.add('matched')
        tile2.classList.add('matched')

        //remove Event listner to disable reselsction on match
        tile1.removeEventListener('click', tileClickHandler)
        tile2.removeEventListener('click', tileClickHandler)

    } else {
        console.log('No match')

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
        }, 1500); 
    }       
            //check win condition 
            checkWinCondition()

            //switch player turn
            switchPlayer()
}
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

//click event fo every ttile generated
    tiles.forEach((tile) => {
        tile.addEventListener('click', tileClickHandler)
    })
