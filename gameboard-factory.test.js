// gameboard should create the grids, record the shots
// send the hit function to correct ship and let the ships be
// placed on the grids

const createGameBoard = require("./gameboard-factory.js");

const input = [
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

describe("board", () => {
  test("ships are created", () => {
    const playerBoard = createGameBoard(input);
    expect(Object.keys(playerBoard.ships).length).toBe(5);
    expect(Object.keys(playerBoard.ships)[0]).toBe("carrier");
  });

  test("ships placed correctly", () => {
    const playerBoard = createGameBoard(input);
    expect(playerBoard.board[0][0]).toBe("carrier");
    expect(playerBoard.board[1][0]).toBe("battleship");
    expect(playerBoard.board[2][0]).toBe("destroyer");
    expect(playerBoard.board[3][0]).toBe("submarine");
    expect(playerBoard.board[4][0]).toBe("patrol boat");
  });

  test("empty shot results in miss", () => {
    const playerBoard = createGameBoard(input);
    expect(playerBoard.receiveAttack([5, 4])).toBe(-1);
  });
  test("already hit shot results in false", () => {
    const playerBoard = createGameBoard(input);
    playerBoard.receiveAttack([5, 4]);
    expect(playerBoard.receiveAttack([5, 4])).toBe(false);
  });
  test("successful shot returns 1", () => {
    const playerBoard = createGameBoard(input);
    expect(playerBoard.receiveAttack([0, 0])).toBe(1);
  });
  test("sinking shot returns ship name", () => {
    const playerBoard = createGameBoard(input);
    playerBoard.receiveAttack([0, 0]);
    playerBoard.receiveAttack([0, 1]);
    playerBoard.receiveAttack([0, 2]);
    playerBoard.receiveAttack([0, 3]);
    expect(playerBoard.receiveAttack([0, 4])).toBe("carrier");
  });
});


  test("all ships sunk", () => {
    const playerBoard = createGameBoard(input);
    input.flat(1).forEach((coord) => {
      playerBoard.receiveAttack(coord);
    });
    expect(playerBoard.isAllSunk()).toBe(true)
  })