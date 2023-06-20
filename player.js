import createGameBoard from "./gameboard-factory.js";

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = createGameBoard();
  }
  attack(board, coords) {
    if (!coords) coords = this.computerAttack(board);
    return board.receiveAttack(coords);
  }

  computerAttack(board) {
    const coords = [];
    do {
      let x = Math.floor(Math.random() * 8);
      let y = Math.floor(Math.random() * 8);
      coords.push(x);
      coords.push(y);
    } while (board.board[coords]);
    return coords;
  }
}
