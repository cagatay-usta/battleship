import Player from "./player";

describe("player", () => {
  test("attacking same coords returns false", () => {
    const player = new Player();
    const enemy = new Player();
    player.attack(enemy.board, [0, 0]);
    expect(player.attack(enemy.board, [0, 0])).toBe(false);
  });

  test("shots processed to correct board", () => {
    const player = new Player();
    const enemy = new Player();
    player.attack(enemy.board, [0, 0]);
    expect(enemy.board.board[0][0]).toBe("hit");
  });

  test("no coords given makes computer play", () => {
    const player = new Player("player");
    const enemy = new Player("computer");
    expect(enemy.attack(player.board)).not.toBe(false);
  });
});
