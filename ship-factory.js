function createShip(name) {
  const length = (() => {
    if (name == "destroyer") return 3;
  })();
  let hitCount = 0;
  let sunk = false;

  const hit = () => hitCount++;
  const isSunk = () => {
    return hitCount < length ? false : true;
  };

  return { hit, isSunk };
}

module.exports = createShip;
