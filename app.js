//player factory
function PlayerFactory(name, marker) {
    return {name,marker}
 }

//create players
const playerX = PlayerFactory('Player X', 'X');
const playerO = PlayerFactory('Player O', 'O');

//Board controller
const BoardController = (function(){
let board = [1,2,3,4,5,6,7,8,9];
return{
 board:board,
 updateBoard:function(id){
   board.splice(Number(id), 1, gameController.getActivePlayer());
 }    
}
})()

//UI controller
const UIController = (function(){
return{
placeMarker: function(target){
 target.textContent = gameController.getActivePlayer();
},
displayMessage: function(target){
 target.textContent = `${gameController.activePlayer()}'s turn`;
}
}
})();


//game controller
const gameController = (function(){
let playing = true;
let activePlayer = playerX.marker;

const UISelectors = {
 gameBoard:'.gameBoard',
 cell:'.cell',
 messageBox: '.messageBox',
 playerXIndicator:'.playerX',
 playerOIndicator:'.playerO',
 resetBtn:'.reset'
}

const getActivePlayer = function(){
 return activePlayer;
}

const winCheck = function() {
if(BoardController.board[0] == BoardController.board[1] && BoardController.board[0] == BoardController.board[2]) {
 document.querySelector(UISelectors.messageBox).textContent= `Player ${activePlayer} Wins!`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
 playing=false;
 return;
}
if(BoardController.board[3] === BoardController.board[4] && BoardController.board[3] === BoardController.board[5]) {
document.querySelector(UISelectors.messageBox).textContent= `Player ${activePlayer} Wins!`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
 playing=false;
 return;
}
if(BoardController.board[6] === BoardController.board[7] && BoardController.board[6] === BoardController.board[8]) {
document.querySelector(UISelectors.messageBox).textContent= `Player ${activePlayer} Wins!`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
 playing=false;
 return;
}
if(BoardController.board[0] === BoardController.board[3] && BoardController.board[0] === BoardController.board[6]){
document.querySelector(UISelectors.messageBox).textContent= `Player ${activePlayer} Wins!`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
playing=false;
 return;
 
}
if(BoardController.board[1] === BoardController.board[4] && BoardController.board[1] === BoardController.board[7]){
document.querySelector(UISelectors.messageBox).textContent= `Player ${activePlayer} Wins!`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
 playing=false;
 return;
}
if(BoardController.board[2] === BoardController.board[5] && BoardController.board[2] === BoardController.board[8]){
document.querySelector(UISelectors.messageBox).textContent= `Player ${activePlayer} Wins!`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
playing=false;
 return;
}
if(BoardController.board[0] === BoardController.board[4] && BoardController.board[0] === BoardController.board[8]){
document.querySelector(UISelectors.messageBox).textContent= `Player ${activePlayer} Wins!`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
 playing=false;
 return;
 
}
if(BoardController.board[2] === BoardController.board[4] && BoardController.board[2] === BoardController.board[6]) {
document.querySelector(UISelectors.messageBox).textContent= `Player ${activePlayer} Wins!`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
 playing=false;
    return;
}
if (drawCheck(BoardController.board) === true){
 document.querySelector(UISelectors.messageBox).textContent= `Draw`;
 document.querySelector(UISelectors.messageBox).classList.remove('hidden');
 playing=false;
    return;
}
}

const drawCheck = function(board) {
return (BoardController.board).every(i => (typeof i === "string")); 
}

const switchPlayer = function(){
document.querySelector(UISelectors.playerXIndicator).classList.remove('active');
document.querySelector(UISelectors.playerOIndicator).classList.remove('active');
activePlayer = activePlayer === playerX.marker ? playerO.marker: playerX.marker; 
document.querySelector(`.player${activePlayer}`).classList.add('active');
}

const reset = function(){
playing=true;
document.querySelectorAll(UISelectors.cell).forEach((cell)=>{
 cell.textContent='';
 cell.dataset.state='';
 document.querySelector(UISelectors.messageBox).textContent='';
 document.querySelector(UISelectors.messageBox).classList.add('hidden');
 })

BoardController.board = [1,2,3,4,5,6,7,8,9];
activePlayer = playerX.marker;
document.querySelector(UISelectors.playerXIndicator).classList.remove('active');
document.querySelector(UISelectors.playerOIndicator).classList.remove('active');
document.querySelector(UISelectors.playerXIndicator).classList.add('active'); 
}

return { 
getActivePlayer,
gameBoardEvent : function(){
document.querySelectorAll(UISelectors.cell).forEach((cell)=>{
cell.addEventListener('click', function(){
 if(playing){
 if(cell.dataset.state !== 'selected'){
   UIController.placeMarker(cell);
   BoardController.updateBoard(cell.id);
   cell.dataset.state = 'selected' ;
   winCheck();
   switchPlayer();
   document.querySelector(UISelectors.resetBtn).addEventListener('click', reset);
 }
 else{
   return;
 }
 }
 else{
return;
 }  
})
})
}
}
})(UIController);

gameController.gameBoardEvent();

