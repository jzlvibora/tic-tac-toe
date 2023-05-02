# tic-tac-toe
This is a JavaScript implementation of the classic game Tic Tac Toe. The code is organized into four modules:

1. PlayerFactory - This module is responsible for creating the players in the game. It is a factory function that takes two arguments, the player's name and their marker (either 'X' or 'O'). It returns an object with two properties: name and marker.

2. The BoardController object handles the game board and its state. It initializes the game board with 9 cells, and keeps track of the current active player and whether the game is still ongoing. It also provides a method to update the board state and reset the board.

3. The UIController object handles the user interface of the game. It provides methods to place markers on the board, switch player indicators, reset the board display, and show game over messages.

4. The GameController object is responsible for handling the game logic. It initializes the game board event listener, which listens for clicks on the board cells. When a cell is clicked, it adds the current player's marker to the cell, updates the board state, checks for a win or draw, switches players, and updates the UI.
