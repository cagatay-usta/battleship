import createShip from "./ship-factory.js";

function randomCoordGenerator() {
  function isColliding(coords) {
    // if any of the ship coordinates are the same return true
    const flatCoord = coords.flat(1);
    for (let i = 0; i < flatCoord.length; i++) {
      for (let j = i + 1; j < flatCoord.length; j++) {
        if (
          flatCoord[i][0] === flatCoord[j][0] &&
          flatCoord[i][1] === flatCoord[j][1]
        )
          return true;
      }
    }
    return false;
  }
  const coords = [];
  const lengths = [5, 4, 3, 3, 2];
  for (let i = 0; i < 5; i++) {
    let item = [];

    let x;
    let y;
    // pick random ship orientation
    let axis = Math.random() < 0.5 ? 1 : 0;
    if (axis) {
      x = Math.floor(Math.random() * (10 - lengths[i]));
      y = Math.floor(Math.random() * 10);
    } else {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * (10 - lengths[i]));
    }

    item.push([x, y]);
    for (let j = 1; j < lengths[i]; j++) {
      if (axis) x++;
      else y++;
      item.push([x, y]);
    }

    coords.push(item);
  }
  // if there is any collision call the function recursively until there isnt and return its coordinates
  if (isColliding(coords)) return randomCoordGenerator();
  return coords;
}

const symbols = [
  "carrier",
  "battleship",
  "destroyer",
  "submarine",
  "patrol boat",
];

function createGameBoard(coordinates = randomCoordGenerator()) {
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

    for (let i = 0; i < coordinates.length; i++) {
      ships[symbols[i]] = createShip(symbols[i]);
      coordinates[i].forEach(([x, y]) => {
        board[x][y] = symbols[i];
      });
    }
  }

  placeShips(coordinates, board);

  const receiveAttack = ([x, y]) => {
    // if already hit, or already missed return false
    if (board[x][y] === "hit" || board[x][y] === "miss") return false;
    // if miss, return -1
    if (!board[x][y]) {
      board[x][y] = "miss";
      return -1;
      // if hit return 1, if sunk return ship name
    } else {
      let shipName = board[x][y];
      board[x][y] = "hit";
      ships[shipName].hit();
      if (ships[shipName].isSunk()) return shipName;
      return 1;
    }
  };

  const isAllSunk = () => {
    for (let i = 0; i < 5; i++) {
      if (ships[symbols[i]].isSunk() === false) return false;
    }
    return true;
  };

  return { board, receiveAttack, ships, isAllSunk };
}

export default createGameBoard;
