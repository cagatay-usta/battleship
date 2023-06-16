// gameboard should create the grids, record the shots
// send the hit function to correct ship and let the ships be
// placed on the grids

const createGameBoard = require("./gameboard-factory.js");

describe("board", () => {
  test("ships placed correctly", () => {
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

    const playerBoard = createGameBoard(input);
    expect(playerBoard.board[2][0]).toBe("D");
    expect(playerBoard.board[1][0]).toBe("B");
    expect(playerBoard.board[0][0]).toBe("C");
  });
});
