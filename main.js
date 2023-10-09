import './style.css'

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const BLOCK_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
];

const shapes = [
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1],
    [1],
    [1],
    [1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ]
];

const piece = {
  position: { x: 4, y: 5 },
  shape: [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
};

const bottomLimit = piece.position.y < BOARD_HEIGHT - piece.shape.length;
const rightLimit = piece.position.x < BOARD_WIDTH - piece.shape[0].length;
const leftLimit = piece.position.x > 0;

canvas.width = BOARD_WIDTH * BLOCK_SIZE;
canvas.height = BOARD_HEIGHT * BLOCK_SIZE;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

async function update() {
  drawBoard();
  drawPiece();

  handlePiecePlacement();
  clearRow();

  window.requestAnimationFrame(update);
  //setTimeout(() => { window.requestAnimationFrame(update); }, 500);
}

/**
 * Draws the game board.
 */
const drawBoard = () => {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  BOARD.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block === 1) {
        context.fillStyle = 'white';
        context.fillRect(x, y, 1, 1);
      }
    });
  });
};

/**
 * Draws the current piece on the game board.
 */
const drawPiece = () => {
  piece.shape.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block === 1) {
        context.fillStyle = 'red';
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });
};

/**
 * Checks if a given move is valid for the current piece.
 * @param {string} move - The move to be validated.
 * @returns {boolean} True if the move is valid; otherwise, false.
 */
const isValidMove = (move) => {
  let isValid = true;
  if (move === 'ArrowLeft') {
    for (let row = piece.position.y; row < piece.position.y + piece.shape.length; row++) {
      if (BOARD[row][piece.position.x - 1] === 1) {
        isValid = false;
      }
    }
  } else if (move === 'ArrowRight') {
    for (let row = piece.position.y; row < piece.position.y + piece.shape.length; row++) {
      //piece.shape[0].reduce((accumulator, currentValue) => accumulator + currentValue, 0)] -> possible solution
      if (BOARD[row][piece.position.x + piece.shape[0].length] === 1) {
        isValid = false;
      }
    }
  } else if (move === 'ArrowDown') {
    for (let column = piece.position.x; column < piece.position.x + piece.shape[0].length; column++) {
      if (BOARD[piece.position.y + piece.shape.length][column] === 1) {
        isValid = false;
      }
    }
  }

  return isValid;
};

/**
 * Handles the placement of the Tetris piece on the game board:
 * - Checks for collisions and drops the piece if necessary.
 * - Updates the game board with the placed piece.
 * - Resets the piece to its initial position if it cannot move downward.
 */
const handlePiecePlacement = () => {
  if (piece.position.y >= BOARD_HEIGHT - piece.shape.length || !isValidMove('ArrowDown')) {
    piece.shape.forEach((row, y) => {
      row.forEach((block, x) => {
        if (piece.shape[y][x] === 1) {
          BOARD[piece.position.y + y][piece.position.x + x] = 1;
        }
      });
    });

    generateNewPiece();
  } else {
    //piece.position.y = piece.position.y + 1;
  }
};

/**
 * Clears completed rows on the Tetris game board:
 * - Iterates through each row to check if it's filled with blocks.
 * - Removes filled rows by shifting rows above them downward.
 */
const clearRow = () => {
  for (let row = 1; row < BOARD_HEIGHT; row++) {
    if (!BOARD[row].some((elem) => elem === 0)) {
      BOARD[row] = BOARD[row - 1];
    }
  }
};

/**
 * Generates a new random piece and sets its initial position.
 */
const generateNewPiece = () => {
  piece.position = { y: -1, x: 4 };
  piece.shape = shapes[Math.floor(Math.random() * 4)];
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && leftLimit && isValidMove('ArrowLeft')) {
    piece.position.x--;
  } else if (e.key === 'ArrowRight' && rightLimit && isValidMove('ArrowRight')) {
    piece.position.x++;
  } else if (e.key === 'ArrowDown' && bottomLimit && isValidMove('ArrowDown')) {
    piece.position.y++;
  } else if (e.key === 'ArrowUp') {
    piece.position.y--;
  }
});

update();

