const player1 = {
    score: 0,
    name: 'Player 1'
}

const player2 = {
    score: 0,
    name: 'Player 2'
}

const funPhrases = [
    "{player}, step up to the challenge!",
    "{player}, it's your time to shine!",
    "{player}, take the lead!",
    "{player}, show 'em what you've got!",
    "{player}, you're on!",
    "{player}, dazzle us!",
    "{player}, make your move!",
    "{player}, let's see your skills!",
    "{player}, it's game time!"
]

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

const totalTiles = 12

// Generate random gray and once and store them in arrays
const randomGrayColor = Array.from({ length: totalTiles }, setRandomGrayColor)

//generate pairs of bright colors and store in array
const pairsOfBrightColors =generatePairsOfBrightColors()
console.log('this is the bright color pairs array' ,pairsOfBrightColors);



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
    const brightColors = ['#0000FF', '#00FF00', '#FF00FF', '#FFFF00', '#00FFFF', '#FF0000']
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

    //event listner for user click
    tile.addEventListener('click', () => {
        console.log(`Setting tile color to: ${color}`)
        
        // Check if the tile is already matched
        if (tile.classList.contains('matched')) {
            return  // Don't do anything if it's a matched tile
        }
        
        //is the tile already flipped?
        if(tile.dataset.flipped === 'false') {
            //if not flipped
            tile.dataset.flipped = 'true'
            
            tile.style.backgroundColor = color
        }else{
            //if tile is flipped, reset the tile
            tile.dataset.flipped = 'false'
            tile.style.backgroundColor = randomGrayColor[index]
    
        }
    })
    
    // Initialize with random gray color
    tile.style.backgroundColor = randomGrayColor[index]
    console.log('This is the tile color',color);
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
            player1ScoreElement.textContent = `${currentPlayer.name}: ${currentPlayer.score}`
        } else {
            player2ScoreElement.textContent = `${currentPlayer.name}: ${currentPlayer.score}`
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
        }, 1000); 
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
    
    function tileClickHandler() {
        if (this.classList.contains('matched')) {
            console.log('Matched tile clicked, skipping')
            return
        }

        console.log('Regular tile clicked, processing')

        if (selectedTiles.length < 2) {
                selectedTiles.push(this)
                this.style.border = '5px solid #006767'
        }
    
        if (selectedTiles.length === 2) {
        
    
            checkColorMatch(selectedTiles[0], selectedTiles[1], tiles)
            selectedTiles.forEach((selectedTile) => {
                selectedTile.style.border = '5px solid #fff'
            });
            selectedTiles = []
            
            //check the win condition with function
            checkWinCondition()
         }

    }

//click event fo every ttile generated
    tiles.forEach((tile) => {
        tile.addEventListener('click', tileClickHandler)
    })
