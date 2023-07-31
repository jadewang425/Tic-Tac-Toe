// define constants
const options = {
    0: null,
    1: 'X',
    '-1': 'O'
}

// define required variables use to track the game progress
let board
let turn
let winner

// store html elements that will be accessed in the code
const messageEl = document.querySelector('h2')
const playAgainBtn = document.getElementById('playAgain')
const inputEls = document.querySelectorAll('input')

// initial the game
// render the values to the page
// wait for the user to click a square

init ()

function init () {
    turn = 1
    winner = null
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    // render()
}

// update the text in each cell based on the cell value
// loop over the board array
// loop over each array's element
function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        // console.log(colArr);
        colArr.forEach(function(cellVal,rowIdx) {
            const cellId = 'c' + colIdx + 'r' + rowIdx
            // console.log('cellId', cellId)
            const cellEl = document.getElementById(cellId)
            cellEl.innerText = options[cellVal]
        })
    }
)}

// I will continue to work on it this week... I need more time to understand how each function is created...

// handle a player clicking a square

// handle a player clicking the replay button
