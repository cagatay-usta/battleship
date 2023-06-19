const createGameBoard = require("./gameboard-factory");

class Player {
  constructor(name) {
    this.name = name;
    this.board = createGameBoard();
  }
  attack(board, coords) {
    return board.receiveAttack(coords);
  }
}

module.exports = Player;
