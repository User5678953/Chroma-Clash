
//Main approach
    //Define an array of colors: Create an array with the colors for the tiles.
    //Generate Tiles: Write a function that loops over the colors array and creates pairs of tiles with matching colors.
    //Shuffle Tiles: Implement a function that shuffles the tiles randomly. This will ensure that the tiles are placed in different positions each time the game starts.
    //Tile Click Event: Add a click event listener to the tiles, allowing players to flip them when clicked.
    //Tile Matching Logic: Implement the logic to check if two flipped tiles have the same color. If they match, increment the player's score; if not, flip them back after a short delay.
    //Timer Countdown: Create a timer that counts down from a set time and ends the game when it reaches zero.
    //Player Turns: Keep track of player turns and update the player prompt accordingly.

//generate 1 tile test!
const totalTiles = 12

function generateTile() {
const tile = document.createElement('div')
tile.classList.add('tile')

return tile
}

//for loop to iterate totalTiles and genrate multiple  

const tilesContainer = document.querySelector('.tiles-container')
for (let i=0; i < totalTiles; i++){
   const tile =generateTile() 
tilesContainer.appendChild(tile)
}