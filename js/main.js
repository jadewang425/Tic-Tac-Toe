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
//console.log(cellEls)

// initial the game
// render the values to the page
// wait for the user to click a square

init ()

function init () {
    turn = 1
    winner = null
    boardEl.style.backgroundColor = 'white';
    messageEl.style.color ='black';
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
        messageEl.innerText = winner + " wins!";
        boardEl.style.backgroundColor = 'grey';
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
    } else if (winner) return
    // console.log('handleChoice evt', evt.target)
    // turn h2 back to black after an invaild choice is made
    messageEl.style.color = 'black'

    // get cell id
    const cellId = evt.target.getAttribute('id');
    // console.log('handleChoice cellId', cellId)

    // get column array
    const colIdx = cellId[1]
    const colArr = board[colIdx]
    // console.log('handleChoice board[colIdx]', colIdx);

    // get row Index
    const rowIdx = cellId[3];
    // console.log('handleChoice rowIdx', rowIdx);

   // update the cell with player's marker
    colArr[rowIdx] = turn;

    // change player
    turn *= -1

    // check if there's a winner
    winner = getWinner(colIdx, rowIdx)
    console.log('winner', winner)

    render()
}

// check column winner
function checkColWinner(colIdx, rowIdx) {
    let player = board[colIdx][rowIdx];
    let colCount = 0;
    // console.log('checkColWinner, col ', board[colIdx])
    for (let i = 0; i < board[colIdx].length; i++) {
        if (board[colIdx][i] === player) {
            colCount ++;
        }        
    }
    // console.log('checkColWinner')
    return colCount === 3 ? options[player] : null;
}

// check row winner
function checkRowWinner(colIdx, rowIdx) {
    let player = board[colIdx][rowIdx];
    let rowCount = 0;
    //console.log('checkRowWinner', board[colIdx]);
    for (let i = 0; i < board[colIdx].length; i++) {
        if (board[i][rowIdx] === player) {
            rowCount += 1;
        }
    }
    // console.log('checkRowWinner')
    return rowCount === 3 ? options[player] : null
}

// check NWSE winner
function checkDiagonalWinNESW(colIdx, rowIdx) {
    let player = board[colIdx][rowIdx];
    let NESWCount = 0;
    for (let i = 0; i < board[colIdx].length; i++) {
        if (board[i][i] === player) {
            NESWCount ++;
        }
    }
    // console.log('NESWCount', NESWCount)
    return NESWCount === 3 ? options[player] : null;
    
}

// check NESW winner
function checkDiaginalWinNWSE(colIdx, rowIdx) {
    let player = board[colIdx][rowIdx];
    let NWSECount = 0;
    let r = board[colIdx].length - 1
    for (let i = 0; i < board[colIdx].length; i++) {
        // console.log('checkDiaginalWinNWSE - r', r);
        if (board[i][r] === player) {
            NWSECount ++;
        }
        r--;
    }
    // console.log('NWSECount', NWSECount)
    return NWSECount === 3 ? options[player] : null;
}

function getWinner(colIdx, rowIdx) {
    // console.log('this is rowidx - in getWinner', rowIdx)
    // console.log('this is colidx - in getWinner', colIdx)
    // console.log('this is the board', board)
    for (i = 0; i < board.length; i++) {
        if (board[i].some(e => e === 0)) {
            return (
                checkColWinner(colIdx, rowIdx) || 
                checkRowWinner(colIdx, rowIdx) ||
                checkDiagonalWinNESW(colIdx, rowIdx) ||
                checkDiaginalWinNWSE(colIdx, rowIdx)
            )
        }
    }
    return 'T'
}

boardEl.addEventListener('click', handleChoice)


// handle a player clicking the replay button
resetGameBtn.addEventListener('click', init)
