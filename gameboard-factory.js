import createShip from "./ship-factory.js";

// TODO: improve generator for connected ships
// pick random axis
// starting coords < 9 - shiplength
function randomCoordGenerator() {
  const coords = [];
  const lengths = [5, 4, 3, 3, 2];

  for (let i = 0; i < 5; i++) {
    coords[i] = [];
    let x;
    let y;
    // pick random ship orientation
    let axis = Math.random() < 0.5 ? 1 : 0;
    if (axis) {
      do {
        x = Math.floor(Math.random() * (10 - lengths[i]));
        y = Math.floor(Math.random() * 10);
        // do while checks for possible collisions of ships beforehand and pick another starting coord if so
      } while (
        coords.forEach((coord) =>
          coord.some((a) => {
            return (
              a === [x, y] ||
              a === [x + 1, y] ||
              a === [x + 2, y] ||
              a === [x + 3, y] ||
              a === [x + 4, y]
            );
          })
        )
      );
    } else {
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * (10 - lengths[i]));
      } while (
        coords.forEach((coord) =>
          coord.some((a) => {
            return (
              a === [x, y] ||
              a === [x, y + 1] ||
              a === [x, y + 2] ||
              a === [x, y + 3] ||
              a === [x, y + 4]
            );
          })
        )
      );
    }
    coords[i].push([x, y]);
    for (let j = 1; j < lengths[i]; j++) {
      if (axis) x++;
      else y++;
      coords[i].push([x, y]);
    }
  }
  return coords;
}

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
    return ships.every((ship) => ship.isSunk());
  };

  return { board, receiveAttack, ships, isAllSunk };
}

export default createGameBoard;
