import Player from "./player.js";

const player = new Player("player");
const enemy = new Player("computer");

function createGrids(playerBoard, player) {
  const gridContainer = document.createElement("div");
  const board = player.board.board;
  gridContainer.classList.add("grid-container");
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const grid = document.createElement("div");
      grid.classList.add("grid");

      grid.dataset.contains = board[i][j];
      grid.dataset.coords = `${i}${j}`;
      // display only friendly ships
      if (player.name !== "computer")
        grid.textContent = board[i][j].charAt(0).toUpperCase();
      // add css classes for miss or hit
      if (board[i][j] === "hit") grid.classList.add("hit");
      if (board[i][j] === "miss") grid.classList.add("miss");
      gridContainer.appendChild(grid);
    }
  }
  playerBoard.appendChild(gridContainer);
}

const playerBoard = document.querySelector(".player1-board");
const enemyBoard = document.querySelector(".player2-board");

function drawScreen() {
  if (playerBoard.firstChild) playerBoard.removeChild(playerBoard.firstChild);
  createGrids(playerBoard, player);

  if (enemyBoard.firstChild) enemyBoard.removeChild(enemyBoard.firstChild);
  createGrids(enemyBoard, enemy);
}

function attackClickHandler(e) {
  const coords = e.target.dataset.coords.split("");
  // player.attack returns false if the move is not legal (eg hitting same coords again)
  const isLegal = player.attack(enemy.board, coords);
  drawScreen();
  if (isLegal) {
    if (enemy.board.isAllSunk()) return console.log("player won");
    setTimeout(() => {
      enemy.attack(player.board);
      drawScreen();
    }, 1000);
    if (player.board.isAllSunk()) return console.log("computer won");
  }
}

function userAttack() {
  enemyBoard.addEventListener("click", attackClickHandler);
}

drawScreen();

userAttack();
