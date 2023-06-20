import createShip from "./ship-factory.js";

const testInput = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [3, 0],
    [3, 1],
    [3, 2],
  ],
  [
    [4, 0],
    [4, 1],
  ],
];

function createGameBoard(coordinates = testInput) {
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
    In order: Carrier -> Battleship -> Destroyer -> Submarine -> Patrol Boat
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
  const isAllSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return { board, receiveAttack, ships, isAllSunk };
}

export default createGameBoard;
