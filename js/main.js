document.addEventListener('DOMContentLoaded', () => {

const totalTiles = 12

//problem: need colors to appear only 2 times in the genrate tile grid. 
//i already have the genrate tile function
//I have the array of bright colors
//I want to duplicate each color in the array to make a pair
//I will shuffle the array to mix the colors 
//I will the use the new shuffled array to assign the colors to the tiles during the generatetile function ()
//After tile generation, need to pop colors that have been assigned more than 2 times. 
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//I can use this shuffle algorithm to ensure the array shuffles in place and all combos are equally likely.


// Generate random gray and once and store them in arrays
const randomGrayColor = Array.from({ length: totalTiles }, setRandomGrayColor)
const pairsOfBrightColors =generatePairsOfBrightColors()

shuffleArray(pairsOfBrightColors)

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


//Generate random bright colors and store them in an array
const randomBrightColor = Array.from({ length: totalTiles }, setRandomBrightColor)

// generate duplicate bright color array 
//const duplicateBrightColors = randomBrightColor.concat(randomBrightColor)

// Shuffle the array using Fisher-Yates algorithm

function shuffleArray(array) {
    let j
    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        [array[i], array[j]] = [array[j], array[i]]
    }
    }
shuffleArray(pairsOfBrightColors)

//generate pairs of colors 
function generatePairsOfBrightColors (){
    const brightColors = ['#FF5733', '#FFC300', '#FF85A1', '#40E0D0', '#FF6B81', '#FFD700']
    const pairs = []

    for (const color of brightColors) {
        pairs.push(color,color)
    }

    shuffleArray(pairs)
    return pairs
}

//generate tile initially 
function generateTile(index, color) {
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
        tile.style.backgroundColor = color
    }else{
        //if tile is flipped, reset the tile
        tile.dataset.flipped = 'false'
        tile.style.backgroundColor = randomGrayColor[index]
    
    }
})
    // Initialize with random gray color
    tile.style.backgroundColor = randomGrayColor[index]

    return tile
}
//for loop to iterate totalTiles and genrate multiple  
function generateAllTiles(){
    const tilesContainer = document.querySelector('.tiles-container')
    for (let i=0; i < totalTiles; i++){
    const tile = generateTile(i, pairsOfBrightColors[i]) 
    tilesContainer.appendChild(tile)
    }
}
generateAllTiles()
})

