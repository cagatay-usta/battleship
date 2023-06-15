function createShip(name) {
  if (name === "destroyer") {
    const length = 3;
  }
  let hitCount = 0;
  let sunk = false;

  const hit = () => {
    hitCount++;
    if (hitCount >= length) sunk = true;
  };
  const isSunk = () => sunk;

  return { hit, isSunk };
}

module.exports = createShip;
