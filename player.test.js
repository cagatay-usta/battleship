const Player = require("./player");

describe("player", () => {
  test("attacking same coords returns false", () => {
    const player = new Player();
    const enemy = new Player();
    player.attack(enemy.board, [0, 0]);
    expect(player.attack(enemy.board, [0, 0])).toBe(false);
  });
});
