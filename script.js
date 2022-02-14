//player factory
function PlayerFactory(name, marker) {
    return { name, marker }
}

//create players
const playerX = PlayerFactory('Player X', 'X');
const playerO = PlayerFactory('Player O', 'O');

//Board controller
const BoardController = (function () {
    let isPlaying = true;
    let activePlayer = playerX.marker;
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return {
        board,
        activePlayer,
        isPlaying,
        updateBoard: function (id) {
            BoardController.board.splice(Number(id), 1, BoardController.activePlayer);
        },
        resetBoard: function () {
            BoardController.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        },
        resetIsPlaying: function () {
            BoardController.isPlaying = true;
        },
        resetActivePlayer: function () {
            activePlayer = playerX.marker;
        }
    }
})()

//UI controller
const UIController = (function () {
    const UISelectors = {
        gameBoard: '.gameBoard',
        cell: '.cell',
        messageBox: '.messageBox',
        playerXIndicator: '.playerX',
        playerOIndicator: '.playerO',
        resetBtn: '.reset'
    }
    return {
        UISelectors,
        placeMarker: function (target) {
            target.textContent = BoardController.activePlayer;
        },
        switchIndicator: function () {
            document.querySelector(UISelectors.playerXIndicator).classList.remove('active');
            document.querySelector(UISelectors.playerOIndicator).classList.remove('active');
            document.querySelector(`.player${BoardController.activePlayer}`).classList.add('active');
        },
        resetCellState: function () {
            document.querySelectorAll(UISelectors.cell).forEach((cell) => {
                cell.dataset.state = '';
                cell.classList.remove('Xmark');
                cell.classList.remove('Omark');
            })
        },
        resetBoardDisplay: function () {
            document.querySelectorAll(UISelectors.cell).forEach((cell) => {
                cell.textContent = '';
            document.querySelector(UISelectors.messageBox).classList.add('hidden');
            })
        }


    }
})();


//Game controller
const GameController = (function () {
    const UISelectors = UIController.UISelectors;
    const winCheck = function () {

        if (BoardController.board[0] == BoardController.board[1] && BoardController.board[0] == BoardController.board[2]) {
            document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;
        }
        if (BoardController.board[3] === BoardController.board[4] && BoardController.board[3] === BoardController.board[5]) {
            document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;
        }
        if (BoardController.board[6] === BoardController.board[7] && BoardController.board[6] === BoardController.board[8]) {
            document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;
        }
        if (BoardController.board[0] === BoardController.board[3] && BoardController.board[0] === BoardController.board[6]) {
            document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;

        }
        if (BoardController.board[1] === BoardController.board[4] && BoardController.board[1] === BoardController.board[7]) {
            document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;
        }
        if (BoardController.board[2] === BoardController.board[5] && BoardController.board[2] === BoardController.board[8]) {
            document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;
        }
        if (BoardController.board[0] === BoardController.board[4] && BoardController.board[0] === BoardController.board[8]) {
            document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;

        }
        if (BoardController.board[2] === BoardController.board[4] && BoardController.board[2] === BoardController.board[6]) {
            document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;
        }
        if (drawCheck(BoardController.board) === true) {
            document.querySelector(UISelectors.messageBox).textContent = `Draw`;
            document.querySelector(UISelectors.messageBox).classList.remove('hidden');
            BoardController.isPlaying = false;
            return;
        }
    }

    const drawCheck = function (board) {
        return (BoardController.board).every(i => (typeof i === "string"));
    }

    const switchPlayer = function () {
        BoardController.activePlayer = BoardController.activePlayer === playerX.marker ? playerO.marker : playerX.marker;
        
    }

    return {
        gameBoardEvent: function () {
            
            document.querySelectorAll(UISelectors.cell).forEach((cell) => {
                
                cell.addEventListener('click', function () {
                    if (!BoardController.isPlaying) return;
                    console.log(BoardController.board,BoardController.isPlaying);
                    if (cell.dataset.state === 'selected') return;
                    cell.classList.add(`${BoardController.activePlayer}mark`);
                    UIController.placeMarker(cell);
                    BoardController.updateBoard(cell.id);
                    cell.dataset.state = 'selected';
                    winCheck();
                    switchPlayer();
                    UIController.switchIndicator();
                })
            })
            document.querySelector(UISelectors.resetBtn).addEventListener('click', function () {
                
                BoardController.resetBoard();
                BoardController.resetIsPlaying();
                BoardController.resetActivePlayer();
                UIController.resetBoardDisplay();
                UIController.resetCellState();
               
            })
        }
    }
})(UIController);

GameController.gameBoardEvent();

