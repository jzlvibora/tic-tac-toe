//player factory
function PlayerFactory(name,marker) {
    return {name,marker}
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
          BoardController.isPlaying = true;
          BoardController.activePlayer = playerX.marker;
          UIController.resetCellState();
          document.querySelectorAll(UIController.UISelectors.cell).forEach((cell)=>{
            cell.classList.remove('Xmark');
            cell.classList.remove('Omark');
        })
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
                cell.classList.remove();
                
            })
        },
        resetBoardDisplay: function () {
            document.querySelectorAll(UISelectors.cell).forEach((cell) => {
                cell.textContent = '';
            document.querySelector(UISelectors.messageBox).classList.add('hidden');
              UIController.switchIndicator();
            })
        },
      gameOverMessageDisplay(result){
        if(result==="winner") document.querySelector(UISelectors.messageBox).textContent = `Player ${BoardController.activePlayer} Wins!`;
        if(result==="draw") document.querySelector(UISelectors.messageBox).textContent = `It's a draw`;
          document.querySelector(UISelectors.messageBox).classList.remove('hidden');
          BoardController.isPlaying = false;
            
      }


    }
})();


//Game controller
const GameController = (function () {
  
    const UISelectors = UIController.UISelectors;
    const winCheck = function () {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
        winningCombinations.forEach((item, index) => { 
            if (BoardController.board[item[0]] === BoardController.activePlayer && BoardController.board[item[1]] === BoardController.activePlayer && BoardController.board[item[2]] === BoardController.activePlayer)  
              return UIController.gameOverMessageDisplay('winner');
          
          if (drawCheck(BoardController.board) === true && BoardController.isPlaying===true) return UIController.gameOverMessageDisplay('draw');
        
        })
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
                    if (!BoardController.isPlaying || cell.dataset.state === 'selected') return;
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
                UIController.resetBoardDisplay();
                UIController.resetCellState();
               
            })
        }
    }
})(UIController);

GameController.gameBoardEvent();
