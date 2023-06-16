function createShip(name) {
  const length = (() => {
    if (name == "destroyer") return 3;
  })();
  let hitCount = 0;

  const hit = () => hitCount++;
  const isSunk = () => hitCount >= length;

  return { hit, isSunk };
}

module.exports = createShip;
