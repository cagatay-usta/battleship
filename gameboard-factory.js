const createShip = require("./ship-factory.js");

function createGameBoard(coordinates) {
  // initiate an empty 10x10 gameboard
  const board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = "";
    }
  }

  const ships = [];

  function placeShips(coordinates, board) {
    /*
    function to place the ships on the board. coordinates arg is an array of 
    5 elements each contains the coordinates for a ship. 
    In order: Carrier(C) -> Battleship(B) -> Destroyer(D) -> Submarine(S) -> Patrol Boat(P)
    */
    const symbols = [
      "carrier",
      "battleship",
      "destroyer",
      "submarine",
      "patrol boat",
    ];

    for (let i = 0; i < coordinates.length; i++) {
      ships[symbols[i]] = createShip(symbols[i]);
      coordinates[i].forEach(([x, y]) => {
        board[x][y] = symbols[i];
      });
    }
  }

  placeShips(coordinates, board);

  const receiveAttack = ([x, y]) => {
    // if already hit, return false
    if (board[x][y] === "hit") return false;
    // if miss, return -1
    if (!board[x][y]) {
      board[x][y] = "hit";
      return -1;
    } else {
      let shipName = board[x][y];
      board[x][y] = "hit";
      ships[shipName].hit();
      if (ships[shipName].isSunk()) return shipName;
      return 1;
    }
  };

  return { board, receiveAttack, ships };
}

module.exports = createGameBoard;
