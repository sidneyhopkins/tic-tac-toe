// create players factory function
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

  return { board }
})();

// game object
const game = (() => {

  // win combos

  // winner conditions

  // check winner



})();

