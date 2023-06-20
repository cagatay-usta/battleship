function createShip(name) {
  const length = (() => {
    if (name == "destroyer" || name == "submarine") return 3;
    if (name == "patrol boat") return 2;
    if (name == "battleship") return 4;
    if (name == "carrier") return 5;
  })();
  let hitCount = 0;

  const hit = () => {
    if (hitCount < length) hitCount++;
  }
  const isSunk = () => hitCount >= length;

  return { hit, isSunk };
}

export default createShip;
