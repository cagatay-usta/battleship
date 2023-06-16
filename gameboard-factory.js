function createGameBoard(coordinates) {
  // initiate an empty 10x10 gameboard
  const board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = "";
    }
  }

  function placeShips(coordinates, board) {
    /*
    function to place the ships on the board. coordinates arg is an array of 
    5 elements each contains the coordinates for a ship. 
    In order: Carrier(C) -> Battleship(B) -> Destroyer(D) -> Submarine(S) -> Patrol Boat(P)
    */
    const symbols = ["C", "B", "D", "S", "P"];

    for (let i = 0; i < coordinates.length - 1; i++) {
      coordinates[i].forEach(([x, y]) => {
        board[x][y] = symbols[i];
      });
    }
  }

  placeShips(coordinates, board);

  const receiveAttack = ([x, y]) => {};

  return { board, receiveAttack };
}

module.exports = createGameBoard;
