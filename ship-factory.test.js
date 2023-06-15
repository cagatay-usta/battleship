// ship factory interface
// has name, length, hitCount, hit method, sunk bool, isSunk method
// only test public interface thus hit() and isSunk()

const createShip = require("./ship-factory");

describe("ship factory", () => {
  test("destroyer sunk at 3 hits", () => {
    const testShip = createShip("destroyer");
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe("true");
  });
});
