const totalTiles = 12

// Generate random gray and once and store them in arrays
const randomGrayColor = Array.from({ length: totalTiles }, setRandomGrayColor)

//generate pairs of bright colors and store in array
const pairsOfBrightColors =generatePairsOfBrightColors()
shuffleArray(pairsOfBrightColors)


document.addEventListener('DOMContentLoaded', () => {


//for loop to iterate totalTiles and genrate multiple  
function generateAllTiles(){
    const tilesContainer = document.querySelector('.tiles-container')
    for (let i=0; i < totalTiles; i++){
    const tile = generateTile(i, pairsOfBrightColors[i], randomGrayColor) 
    tilesContainer.appendChild(tile)
    }
}
generateAllTiles()
})

// Shuffle the array using Fisher-Yates algorithm
function shuffleArray(array) {
    let j
    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        [array[i], array[j]] = [array[j], array[i]]
    }
}

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


