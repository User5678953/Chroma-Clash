const totalTiles = 12

// Generate random gray and once and store them in arrays
const randomGrayColor = Array.from({ length: totalTiles }, setRandomGrayColor)

//generate pairs of bright colors and store in array
const pairsOfBrightColors =generatePairsOfBrightColors()
//shuffleArray(pairsOfBrightColors)
    console.log('this is the bright color pairs array' ,pairsOfBrightColors);

    document.addEventListener('DOMContentLoaded', () => {


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
})

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
//I want to create a function that compares the colors of the player selected cards in the flipped state. 
//if the colors are a match, the selected cards will stay flipped (revealed) and award 1 point to the player whose turn it is, then the player prompt area will update to prompt the next player
//if the selected cards are not a match, the cards will remain visible for a short time, then flip back over. no points will be awarded and the player prompt area will update to prompt the next player.
//when a player prompt is updated, the timer will begin a countdown from 60 seconds
//if no 2 cards are not selected within the timer range and or the timer reaches 0, the player prompt area will update to prompt the next player. 
//the game is over whenever any player reaches 10 matches. 

function checkColorMatch (tile1, tile2, tiles) {
    const color1 = tile1.style.backgroundColor
    const color2 = tile2.style.backgroundColor

    console.log(`Checking color match: ${color1} and ${color2}`)

    //match found
    if (color1 === color2) {
        console.log('matched')
    } else {
        console.log('No match')

   // Delay before resetting colors
        setTimeout(() => {
            //reset colors with delay
            tiles.forEach(tile => {
                tile.style.backgroundColor = tile.dataset.originalColor
            })
        }, 1000) 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile')
    //store user selection
    let selectedTiles =[]
    
    //click event fo every ttile generated
    tiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            if (selectedTiles.length < 2) {
                selectedTiles.push(tile)
                tile.style.border = '5px solid red'
            }
    
                if (selectedTiles.length === 2) {
                    checkColorMatch(selectedTiles[0], selectedTiles[1], tiles)
                    selectedTiles.forEach((selectedTile) => {
                        selectedTile.style.border = '5px solid #fff'
                    });
                    selectedTiles = []
        }

        })
    })
})

