import Player from "./player.js";

const player = new Player("player");
const enemy = new Player("computer");

function createGrids(playerBoard, player) {
  const gridContainer = document.createElement("div");
  const board = player.board.board;
  console.log(player);
  gridContainer.classList.add("grid-container");
  for (let i = 0; i < board.length; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    gridContainer.appendChild(grid);
  }
  playerBoard.appendChild(gridContainer);
}
const playerBoard = document.querySelector(".player1-board");
const enemyBoard = document.querySelector(".player2-board");
createGrids(playerBoard, player);
createGrids(enemyBoard, enemy);

console.log(player.board.board);
