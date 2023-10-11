

const generateBoard = (height, width) => {
  return Array(height).fill().map(() => Array(width).fill(0));
};

/**
 * Draws the game board.
 */
export const drawBoard = () => {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');

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

export const BOARD = generateBoard(20, 10);

