// create player factory function
const playerFactory = (name, token) => {
  const getName = () => name;
  const getToken = () => token;
  return {name, token};
}

// gameboard object
const gameBoard = (() => {

  // generate board array
  let board = []
  for (i = 0; i < 9; i++ ) {
    board.push(' ');
  }

  // select game grid
  const grid = document.querySelector('.grid');

  // display square for each board array item
  board.forEach((item, index) => {
    const square = document.createElement('div');
    square.className = 'square';
    grid.appendChild(square);
  })

  // event listeners for each square
  Array.from(grid.children).forEach((square, index) => {
    square.addEventListener('click', () => {
      // when player clicks, do these things
      // add token to square
      square.classList.add(game.activePlayer.token)
      // add token to board array
      board[index] = game.activePlayer.token;
      // decrement remaining spots
      game.remainingSpots -= 1;
      // switch to next player
      game.nextPlayer();
      game.alertNextPlayer();      
      // remove event listener for that square
      square.style.pointerEvents = 'none';
      // check winner
      game.checkWinner();
      // check remaining spots for tie

    })
  })
  
  return { board }
})();

// game object
const game = (() => {

  // declare players
  const playerOne = playerFactory('Player 1', 'x');
  const playerTwo = playerFactory('Player 2', 'o');

  // initial states
  let activePlayer = playerOne;
  let winnerDeclared = false;
  let remainingSpots = 9;

  // selectors
  let subtext = document.querySelector('.subtext');
  let playerName = document.querySelector('.player-name');

  // win combos
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // check winner
  function checkWinner() {
    winCombos.forEach((item, index) => {
      if (gameBoard.board[item[0]] === this.activePlayer.token && gameBoard.board[item[1]] === this.activePlayer.token && gameBoard.board[item[2]] === this.activePlayer.token) {
        this.winnerDeclared == true;
        console.log(`Winner found: ${this.activePlayer.name}`)
        subtext.innerHTML = `${this.activePlayer.name} wins!`
      }
    })
  }

  // alert next player
  function alertNextPlayer() {
    this.activePlayer === playerOne ? playerName.textContent = 'Player 1' : playerName.textContent = 'Player 2';
  }

  // next player
  function nextPlayer() {
    this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
    console.log(`next player func ran. activePlayer: ${this.activePlayer}`)
  }

  // declare tie
  function declareTie() {
    subtext.innerHTML = 'Tie game!';
  }

  return {
    activePlayer,
    winnerDeclared,
    remainingSpots,
    checkWinner,
    alertNextPlayer,
    nextPlayer,
    declareTie,
  }
})();
