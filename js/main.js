document.addEventListener('DOMContentLoaded', () => {
//Main approach
    //Define an array of colors: Create an array with the colors for the tiles.
    //Generate Tiles: Write a function that loops over the colors array and creates pairs of tiles with matching colors.
    //Shuffle Tiles: Implement a function that shuffles the tiles randomly. This will ensure that the tiles are placed in different positions each time the game starts.
    //Tile Click Event: Add a click event listener to the tiles, allowing players to flip them when clicked.
    //Tile Matching Logic: Implement the logic to check if two flipped tiles have the same color. If they match, increment the player's score; if not, flip them back after a short delay.
    //Timer Countdown: Create a timer that counts down from a set time and ends the game when it reaches zero.
    //Player Turns: Keep track of player turns and update the player prompt accordingly.

//random color for flipped tile
function setRandomBrightColor(){
    const brightColors = ['#FF5733', '#FFC300', '#FF85A1', '#40E0D0', '#FF6B81', '#FFD700']
    const randomColorIndex = Math.floor(Math.random() * brightColors.length)
    return brightColors[randomColorIndex]
}

//random Gray color for unflipped tile
function setRandomGrayColor(){
    const grayColors = ['#A9A9A9', '#808080', '#696969', '#778899', '#708090', '#2F4F4F', '#F0F0F0', '#D0D0D0', '#B0B0B0', '#909090', '#707070', '#505050']
    const randomColorIndex = Math.floor(Math.random() * grayColors.length)
    return grayColors[randomColorIndex]
}

const totalTiles = 12

function generateTile() {
const tile = document.createElement('div')
tile.classList.add('tile')

//Initial state, unflipped
tile.dataset.flipped = false;

//event listner for user click
tile.addEventListener('click', () => {
    console.log('tile clicked')    
    //is the tile already flipped?
    if(tile.dataset.flipped === 'false') {
        //if not flipped
        tile.dataset.flipped = 'true'
        tile.style.backgroundColor = setRandomBrightColor()
    }else{
        //if tile is flipped, reset the tile
        tile.dataset.flipped = 'false'
        tile.style.backgroundColor = setRandomGrayColor()
    
    }
})
    // Initialize with random gray color
    tile.style.backgroundColor = setRandomGrayColor()

    return tile
}
//for loop to iterate totalTiles and genrate multiple  
function generateAllTiles(){
    const tilesContainer = document.querySelector('.tiles-container')
    for (let i=0; i < totalTiles; i++){
   const tile = generateTile() 
    tilesContainer.appendChild(tile)
    }
}
generateAllTiles()
})