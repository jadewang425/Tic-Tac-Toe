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
const resetGameBtn = document.getElementById('resetGame')
const cellEls = [...document.querySelectorAll('#board > div')]

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
    const colIdx = cellEls.indexOf(evt.target)
    console.log(colIdx)
    const colArr = board[colIdx]
    const rowIdx = colArr.indexOf(0)
    if (rowIdx === -1) return
    colArr[rowIdx] = turn
    turn *= -1

    winner = getWinner(colIdx, rowIdx)

    render()
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    const player = board[colIdx][rowIdx]
    let count = 0

    colIdx += colOddset
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
    console.log('the count in countAdj', count)
    return count
}

function checkRowWinners(colIdx, rowIdx) {
    return countAdjacent(colIdx, rowIdx, -1, 0) >= 2 ? board[colIdx][rowIdx] : null
}

function checkColumnWinners(colIdx, rowIdx) {
    return countAdjacent(colIdx, rowIdx, 0, -1) === 2 ? board[colIdx][rowIdx] : null
}

function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1)
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1)

    return adjCountNW + adjCountSE >= 2? board[colIdx][rowIdx] : null
}

function checkDiaginalWinNESW(silIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, -1)
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, 1)

    return adjCountNW + adjCountSE >= 2? board[colIdx][rowIdx] : null
}

function getWinner(colIdx, rowIdx) {
    console.log('this is rowidx - in getWinner', rowIdx)
    console.log('this is colidx - in getWinner', colIdx)
    console.log('this is the board', board)
    return (
        checkRowWinners(colIdx, rowIdx) || 
        checkColumnWinners(colIdx, rowIdx) ||
        checkDiagonalWinNWSE(colIdx, rowIdx) ||
        checkDiaginalWinNESW(colIdx, rowIdx)
    )
}

document.querySelector('#board').addEventListener('click', function () {
    console.log(document.querySelector('#board'))
})


// handle a player clicking the replay button
resetGameBtn.addEventListener('click', init)

// I'm still working on it trying to figure out how to put x and o in the cell...