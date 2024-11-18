/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];
  
  /*---------------------------- Variables (state) ----------------------------*/
  let board, turn, winner, tie;
  
  /*------------------------ Cached Element References ------------------------*/
  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.querySelector('.message');
  const resetBtnEl = document.getElementById('reset');
  
  /*-------------------------------- Functions --------------------------------*/
  function init() {
    board = ['', '', '', '', '', '', '', '', '']; 
    turn = 'X';                                  
    winner = false;                              
    tie = false;                                 
    render();                                    
  }
  
  function render() {
    updateBoard();   
    updateMessage(); 
  }
  
  function updateBoard() {
    board.forEach((value, index) => {
      const square = squareEls[index];
      square.textContent = value;
      if (value === 'X') {
        square.style.color = 'blue';
      } else if (value === 'O') {
        square.style.color = 'red';
      } else {
        square.style.color = ''; 
      }
    });
  }
  
  function updateMessage() {
    if (winner) {
      messageEl.textContent = `Congratulations! Player ${turn} wins!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `It's ${turn}'s turn!`;
    }
  }
  
  function handleClick(evt) {
    const squareIndex = Array.from(squareEls).indexOf(evt.target);
  
    if (board[squareIndex] !== '' || winner || tie) return;

    placePiece(squareIndex); 
    checkForWinner();        
    checkForTie();
    switchPlayerTurn();       
    render();                 
  }
  
  function placePiece(index) {
    board[index] = turn;
  }
  
  function checkForWinner() {
    for (const combo of winningCombos) {
      const [a, b, c] = combo; 
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        winner = true; 
        return;
      }
    }
    winner = false; 
  }
  
  function checkForTie() {
    if (winner) return; 
    tie = !board.includes(''); 
  }
  
  function switchPlayerTurn() {
    if (winner) return; 
    turn = turn === 'X' ? 'O' : 'X';
  }
  
  /*----------------------------- Event Listeners -----------------------------*/
  squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
  });
  
  resetBtnEl.addEventListener('click', init);
  
  /*-------------------------------- Start Game -------------------------------*/
  init();
  