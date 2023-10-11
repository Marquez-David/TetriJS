import './style.css';
import { SIZES, MOVES } from './constants';
import { BOARD, drawBoard } from './board'
import { PIECE, drawPiece, generateNewPiece, rotatePiece } from './piece'

let score = 0;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = SIZES.BOARD_WIDTH * SIZES.BLOCK_SIZE;
canvas.height = SIZES.BOARD_HEIGHT * SIZES.BLOCK_SIZE;
context.scale(SIZES.BLOCK_SIZE, SIZES.BLOCK_SIZE);

function update() {
  drawBoard();
  drawPiece();

  document.querySelector('span').innerText = score;

  handlePiecePlacement();
  window.requestAnimationFrame(update);
}

setInterval(function () {
  //piece.position.y++
}, 700);

/**
 * Checks if a given move is valid for the current piece.
 * @param {string} move - The move to be validated.
 * @returns {boolean} True if the move is valid; otherwise, false.
 */
const isValidMove = (move) => {
  let isValid = true;
  PIECE.shape.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block === 1) {
        const pieceX = PIECE.position.x + x;
        const pieceY = PIECE.position.y + y;
        if (move === 'ArrowLeft' && (pieceX - 1 < 0 || BOARD[pieceY][pieceX - 1] === 1)) {
          isValid = false;
        } else if (move === 'ArrowDown' && (pieceY + 1 >= SIZES.BOARD_HEIGHT || BOARD[pieceY + 1][pieceX] === 1)) {
          isValid = false;
        } else if (move === 'ArrowRight' && (pieceX + 1 >= SIZES.BOARD_WIDTH || BOARD[pieceY][pieceX + 1] === 1)) {
          isValid = false;
        }
      }
    });
  });

  return isValid;
};

/**
 * Handles the placement of the Tetris piece on the game board:
 * - Checks for collisions and drops the piece if necessary.
 * - Updates the game board with the placed piece.
 * - Resets the piece to its initial position if it cannot move downward.
 */
const handlePiecePlacement = () => {
  if (!isValidMove('ArrowDown')) {
    PIECE.shape.forEach((row, y) => {
      row.forEach((block, x) => {
        if (PIECE.shape[y][x] === 1) {
          BOARD[PIECE.position.y + y][PIECE.position.x + x] = 1;
        }
      });
    });

    clearRow();
    generateNewPiece();
  }
};

/**
 * Clears completed rows on the game board:
 * - Iterates through each row to check if it's filled with blocks.
 * - Removes filled rows by shifting rows above them downward.
 */
const clearRow = () => {
  for (let row = 1; row < SIZES.BOARD_HEIGHT; row++) {
    if (!BOARD[row].some((elem) => elem === 0)) {
      BOARD[row] = BOARD[row - 1];
      score += 10;
    }
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === MOVES.LEFT && isValidMove(MOVES.LEFT)) {
    PIECE.position.x--;
  } else if (e.key === MOVES.RIGTH && isValidMove(MOVES.RIGTH)) {
    PIECE.position.x++;
  } else if (e.key === MOVES.DOWN && isValidMove(MOVES.DOWN)) {
    PIECE.position.y++;
  } else if (e.key === MOVES.SWAP) { //e.code === 'Space'
    PIECE.shape = rotatePiece();
  }
});

generateNewPiece();
update();

