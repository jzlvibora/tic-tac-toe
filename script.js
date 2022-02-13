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
        board: function () {
            return board;
        },
        updateBoard: function (id) {
            board.splice(Number(id), 1, activePlayer);
        },
        activePlayer: function () {
            return activePlayer;
        },
        isPlaying: function () {
            return isPlaying
        },
        updateActivePlayer: function (player) {
            activePlayer = player;
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
        getSelectors: function () {
            return UISelectors;
        },
        placeMarker: function (target) {
            target.textContent = BoardController.getActivePlayer;
        },
        displayMessage: function (target) {
            target.textContent = `${BoardController.activePlayer()}'s turn`;
        },
        resetBoardDisplay: function () {
            document.querySelectorAll(UISelectors.cell).forEach((cell) => {
                cell.textContent = '';
                cell.dataset.state = '';
            })
        }
    }
})();


//Game controller
const GameController = (function () {
    const UISelectors = UIController.getSelectors();
    const winCheck = function () {
        
        if (BoardController.board[0] == BoardController.board[1] && BoardController.board[0] == BoardController.board[2]) {
            document.querySelector(UISelectors.messageBox).textContent = `${BoardController.getActivePlayer} Wins!`;
            isPlaying = false;
            return;
        }
        if (BoardController.board[3] === BoardController.board[4] && BoardController.board[3] === BoardController.board[5]) {
            document.querySelector(UISelectors.messageBox).textContent = `${BoardController.getActivePlayer} Wins!`;
            isPlaying = false;
            return;
        }
        if (BoardController.board[6] === BoardController.board[7] && BoardController.board[6] === BoardController.board[8]) {
            document.querySelector(UISelectors.messageBox).textContent = `${BoardController.getActivePlayer} Wins!`;
            isPlaying = false;
            return;
        }
        if (BoardController.board[0] === BoardController.board[3] && BoardController.board[0] === BoardController.board[6]) {
            document.querySelector(UISelectors.messageBox).textContent = `${BoardController.getActivePlayer} Wins!`;
            isPlaying = false;
            return;

        }
        if (BoardController.board[1] === BoardController.board[4] && BoardController.board[1] === BoardController.board[7]) {
            document.querySelector(UISelectors.messageBox).textContent = `${BoardController.getActivePlayer} Wins!`;
            isPlaying = false;
            return;
        }
        if (BoardController.board[2] === BoardController.board[5] && BoardController.board[2] === BoardController.board[8]) {
            document.querySelector(UISelectors.messageBox).textContent = `${BoardController.getActivePlayer} Wins!`;
            isPlaying = false;
            return;
        }
        if (BoardController.board[0] === BoardController.board[4] && BoardController.board[0] === BoardController.board[8]) {
            document.querySelector(UISelectors.messageBox).textContent = `${BoardController.getActivePlayer} Wins!`;
            isPlaying = false;
            return;

        }
        if (BoardController.board[2] === BoardController.board[4] && BoardController.board[2] === BoardController.board[6]) {
            document.querySelector(UISelectors.messageBox).textContent = `${BoardController.getActivePlayer} Wins!`;
            isPlaying = false;
            return;
        }
        if (drawCheck(BoardController.board) === true) {
            document.querySelector(UISelectors.messageBox).textContent = `Draw`;
            isPlaying = false;
            return;
        }
    }

    const drawCheck = function (board) {
        return (BoardController.board).every(i => (typeof i === "string"));
    }

    const switchPlayer = function () {
        document.querySelector(UISelectors.playerXIndicator).classList.remove('active');
        document.querySelector(UISelectors.playerOIndicator).classList.remove('active');
        BoardController.getActivePlayer = BoardController.getActivePlayer === playerX.marker ? playerO.marker : playerX.marker;
        document.querySelector(`.player${BoardController.getActivePlayer}`).classList.add('active');
    }

    return {
        gameBoardEvent: function () {
            if(BoardController.isPlaying) {
                document.querySelectorAll(UISelectors.cell).forEach((cell) => {
                    cell.addEventListener('click', function () {
                    
                        if (cell.dataset.state !== 'selected') {
                            UIController.placeMarker(cell);
                            BoardController.updateBoard(cell.id);
                            cell.dataset.state = 'selected';
                            winCheck();
                            switchPlayer();
                            document.querySelector(UISelectors.resetBtn).addEventListener('click', UIController.resetBoardDisplay);
                        }
                        else {
                            return;
                        }
                    
                    })
                })
            }
            return;
        }
    }
})(UIController);

GameController.gameBoardEvent();

