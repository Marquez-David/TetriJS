# TetriJS
This project is a simple implementation of the classic game Tetris using HTML, CSS, and JavaScript. It is still under development!

## Code Explanation

- The game board is represented by a 2D array called `BOARD`, where 1s represent filled cells and 0s represent empty cells.
- The current tetromino is represented by the `piece` object, which has a position and a shape.
- The `isValidMove` function checks if a move is valid for the current tetromino, considering the game board's boundaries and existing blocks.
- The `drawBoard` function draws the game board on the canvas.
- The `drawPiece` function draws the current tetromino on the canvas.
- Event listeners are used to handle player input (arrow keys) and control the tetromino's movement.

## To-Do

- Implement scoring and level progression.
- Add more tetromino shapes and randomize their selection.
- Create a game-over condition.
- Improve the game's visuals.

