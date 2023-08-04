// define constants
const options = {
    0: null,
    1: 'X',
    '-1': 'O'
}

// define required variables use to track the game progress
let board;
let turn;
let winner;

// store html elements that will be accessed in the code
const messageEl = document.querySelector('h2');
const boardEl = document.querySelector('#board');
const resetGameBtn = document.getElementById('resetGame');
// turn the cells into a JS array
const cellEls = [...document.querySelectorAll('#board > div')];
// console.log(cellEls)

// initial the game
// render the values to the page
// wait for the user to click a square

init ()

function init () {
    turn = 1
    winner = null
    board = [
        [0, 0, 0], // col 0
        [0, 0, 0], // col 1
        [0, 0, 0] // col 2
    ]
    render()
}

function render() {
    renderBoard()
    renderMessage()
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
            //console.log(cellEl);
        })
    }
)}

// render message
function renderMessage() {
    if (winner === "T") {
        messageEl.innerText = "It's a Tie!"
    } else if (winner) {
        messageEl.innerText = winner + " wins!"
    } else {
        messageEl.innerText = options[turn] + "'s turn!"
    }
}


// handle a player clicking a square
function handleChoice(evt) {
    // show 'invalid' if the cell has been marked
    if (evt.target.innerText !== '') {
        messageEl.style.color = 'red'
        return messageEl.innerText = 'Invalid choice!'
    }
    // console.log('handleChoice evt', evt.target)
    // turn h2 back to black after an invaild choice is made
    messageEl.style.color = 'black'

    // get cell id
    const cellId = evt.target.getAttribute('id');
    // console.log('handleChoice cellId', cellId)

    // get column array
    const colIdx = cellId[1]
    const colArr = board[colIdx]
    console.log('handleChoice board[colIdx]', board[colIdx]);

    // get row Index
    const rowIdx = cellId[3];
    // console.log('handleChoice rowIdx', rowIdx);

   // update the cell with player's marker
    colArr[rowIdx] = turn;

    // change player
    turn *= -1

    // check if there's a winner
    winner = getWinner(colIdx, rowIdx)

    render()
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    const player = board[colIdx][rowIdx]
    // console.log('player', player)
    let count = 0

    // use while loop to check the spaces around the played tile
    colIdx += colOffset
    rowIdx += rowOffset
    
    while (
        board[colIdx] !== undefined &&
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ) {
        count++
        colIdx +=colOffset
        rowIdx +=rowOffset
    }
    console.log('the count in countAdj1', count)
    return count
}

// check vertical/column winner
function checkColWinners(colIdx, rowIdx) {
    // go from N to S
    // 0 = not changing the column
    // -1 = moving south down the column
    return countAdjacent(colIdx, rowIdx, 0, -1) === 2 ? board[colIdx][rowIdx] : null
}

// function checkRowWinners(colIdx, rowIdx) {
//     return countAdjacent(colIdx, rowIdx, -1, 0) >= 2 ? board[colIdx][rowIdx] : null
// }

// function checkDiagonalWinNWSE(colIdx, rowIdx) {
//     const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1)
//     const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1)

//     return adjCountNW + adjCountSE >= 2? board[colIdx][rowIdx] : null
// }

// function checkDiaginalWinNESW(colIdx, rowIdx) {
//     const adjCountNE = countAdjacent(colIdx, rowIdx, 1, -1)
//     const adjCountSW = countAdjacent(colIdx, rowIdx, -1, 1)

//     return adjCountNE + adjCountSW >= 2? board[colIdx][rowIdx] : null
// }

function getWinner(colIdx, rowIdx) {
    console.log('this is rowidx - in getWinner', rowIdx)
    console.log('this is colidx - in getWinner', colIdx)
    console.log('this is the board', board)
    return (
        checkColWinners(colIdx, rowIdx) //|| 
        //checkRowWinners(colIdx, rowIdx) ||
        // checkDiagonalWinNWSE(colIdx, rowIdx) ||
        // checkDiaginalWinNESW(colIdx, rowIdx)
    )
}

boardEl.addEventListener('click', handleChoice)


// handle a player clicking the replay button
resetGameBtn.addEventListener('click', init)

// I'm still working on it trying to figure out how to put x and o in the cell...