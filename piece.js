const shapes = [
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0]
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
  ]
];

export const PIECE = {
  position: { x: 0, y: 0 },
  shape: [],
};

/**
 * Generates a new random piece and sets its initial position.
 */
export const generateNewPiece = () => {
  PIECE.position = { y: 0, x: 4 };
  PIECE.shape = shapes[Math.floor(Math.random() * 5)];
};

export const rotatePiece = () => {
  const N = PIECE.shape.length;
  const rotatedPiece = new Array(N).fill().map(() => new Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      rotatedPiece[i][j] = PIECE.shape[N - 1 - j][i];
    }
  }
  return rotatedPiece;
};

/**
 * Draws the current piece on the game board.
 */
export const drawPiece = () => {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');

  PIECE.shape.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block === 1) {
        context.fillStyle = 'red';
        context.fillRect(x + PIECE.position.x, y + PIECE.position.y, 1, 1);
      }
    });
  });
};