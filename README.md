# Chromat-a-Clash

# Features
- A grid of cards that shuffles on game start
- Matching pairs are highlighted and kept open
- Score tracking and time tracking
- Win condition when all pairs are found
- Responsive design for various devices

# New Features
-Single Player mode

## Technologies Used
- HTML, CSS, JavaScript for the core implementation

## How to Play
1. Open the game in your browser.
2. Click on facedown cards to flip them over.
3. Try to find matching pairs by remembering the card positions.
4. When you find a pair, they will remain face-up.
5. Continue until all pairs are matched.
6. Your goal is to match all pairs

## Approach 
-This game is heavily focuses on CSS styling to create a pretty UI

## Issues
-Could not get the timer to work properly with switching turns (old tier code in early commit, deleted later)

## Lessons Learned
-CSS has pallette!
-Flexbox can be annoying
-code structure matters, delete old code, I had an event listner double click bug that drove me crazy

## Approach

1. **Color Generation**:
   - Generate an array of random gray colors for unflipped tiles.
   - Define a set of bright colors and create pairs for each.
   - Shuffle the pairs of bright colors for randomness.

2. **Tile Creation**:
   - For each tile, create a `div` element with a class of `tile`.
   - Assign a random gray color as its initial background.
   - Store the gray color in a data attribute for reference.

3. **Tile Interaction**:
   - When a tile is clicked:
     - If unflipped, reveal its corresponding bright color.
     - If already flipped, revert to its original gray color.
   - Track clicked tiles to check for matches.

4. **Matching Logic**:
   - If two tiles are clicked, compare their bright colors.
   - If they match, mark them as matched and update the player's score.
   - If they don't match, flip them back to their gray colors after a short delay.

5. **Player Switching**:
   - After two tiles are processed, switch the current player.

6. **Win Condition**:
   - Check if the combined scores of both players equal half the total tiles.
   - Declare the player with the higher score as the winner or announce a tie if scores are equal.

7. **Random Aesthetics**:
   - Randomly set the border radius of tiles for a varied look each game.



