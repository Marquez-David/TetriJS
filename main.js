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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 1, 1, 1]
];

const piece = {
  position: { x: 5, y: 18 },
  shape: [
    [1, 1],
    [1, 1]
  ],
};

canvas.width = BOARD_WIDTH * BLOCK_SIZE;
canvas.height = BOARD_HEIGHT * BLOCK_SIZE;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

async function update() {
  drawBoard();
  drawPiece('red');
  //piece.position.y = piece.position.y ++;

  //checkPiecePlaced();

  window.requestAnimationFrame(update);
  //setTimeout(() => { window.requestAnimationFrame(update); }, 500);
}

function drawBoard() {
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
}

function drawPiece(color) {
  piece.shape.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block === 1) {
        context.fillStyle = color;
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });
};

function isValidMove(move) {
  let isValid = true;
  if (move === 'ArrowLeft') {
    for (let row = piece.position.y; row < piece.position.y + piece.shape.length; row++) {
      if (BOARD[row][piece.position.x - 1] === 1) {
        isValid = false;
      }
    }
  } else if (move === 'ArrowRight') {
    for (let row = piece.position.y; row < piece.position.y + piece.shape.length; row++) {
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
}

function checkPiecePlaced() {
  if (!isValidMove('ArrowDown')) {
    drawPiece('white');
  }
}

document.addEventListener('keydown', (e) => {
  const bottomLimit = piece.position.y < BOARD_HEIGHT - piece.shape.length;
  const rightLimit = piece.position.x < BOARD_WIDTH - piece.shape[0].length;
  const leftLimit = piece.position.x > 0;

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

