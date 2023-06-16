const createShip = require("./ship-factory");

describe("ship factory", () => {
  test("destroyer sunk at 3 hits", () => {
    const testShip = createShip("destroyer");
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });

  test("destroyer not sunk at 2 hits", () => {
    const testShip = createShip("destroyer");
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });

  test("destroyer still sunk at 4 hits", () => {
    const testShip = createShip("destroyer");
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });

  test("carrier not sunk at 4 hits", () => {
    const testCarrier = createShip("carrier");
    testCarrier.hit();
    testCarrier.hit();
    testCarrier.hit();
    testCarrier.hit();
    expect(testCarrier.isSunk()).toBe(false);
  });

  test("carrier sunk at 5 hits", () => {
    const testCarrier = createShip("carrier");
    testCarrier.hit();
    testCarrier.hit();
    testCarrier.hit();
    testCarrier.hit();
    testCarrier.hit();
    expect(testCarrier.isSunk()).toBe(true);
  });
});
