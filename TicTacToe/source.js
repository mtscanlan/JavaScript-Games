'use strict';

const cells = document.querySelectorAll('.container');
const humanGlyph = 'x';
const compGlyph = 'o';
const winComboIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

let gameBoard = [];

(function reset() {
    cells.forEach(addEventListener('click', turnClick));
    gameBoard = Array.from(Array(9).keys());
})();

function turnClick(square) {
    if (typeof gameBoard[square.target.id] === 'number') {
        turn(square.target.id, humanGlyph);
        
        if (checkForAvailableMoves()) {
            let bestMove = minimax(gameBoard, compGlyph, 1);
            turn(bestMove.index, compGlyph);
        } else {
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = "#66ff66";
            }
        }
    }
}

function turn(id, glyph) {
    gameBoard[id] = glyph;
    document.getElementById(id + glyph).classList.add('show');
    document.getElementById(id + glyph).classList.remove('hide');
    cells[id].removeEventListener('click', turnClick);

    let gameWon = checkWin(gameBoard, glyph);
    if (gameWon) {
        gameOver(gameWon);
    }
}

function checkWin(board, glyph) {
    let plays = board.reduce((a, e, i) => (e === glyph) ? a.concat(i) : a, []);

    for (let [index, win] of winComboIndexes.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            return {
                index: index,
                player: glyph
            };
        }
    }
}

function gameOver(gameWon) {
    for (let index of winComboIndexes[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player === humanGlyph ? "#4da6ff" : "#ff0000";
    }

    cells.forEach(removeEventListener('click', turnClick));
}

function checkForAvailableMoves() {
    return gameBoard.filter(s => typeof s === 'number').length > 0;
}

function minimax(newBoard, player, depth) {
    var availSpots = newBoard.filter(s => typeof s === 'number');

    if (checkWin(newBoard, humanGlyph)) {
        return {
            score: -10 + depth // return a score that is relative to depth to prioritize early wins
        };
    } 
    else if (checkWin(newBoard, compGlyph)) {
        return {
            score: 10 - depth // return a score that is relative to depth to prioritize early wins
        };
    } 
    else if (availSpots.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        // Simulate the next players turn using the new board state.
        if (player === compGlyph) {
            var result = minimax(newBoard, humanGlyph, depth + 1);
            move.score = result.score;
        } 
        else {
            var result = minimax(newBoard, compGlyph, depth + 1);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    var bestScore = 0;
    if (player === compGlyph) {
        bestScore = -20;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } 
    else {
        bestScore = 20;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    
    return moves[bestMove];
}