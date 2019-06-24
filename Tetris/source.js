const gameCanvas = document.getElementById('gameCanvas');
const scale = 40;
let difficultyLevel = 500;
let gameboard = new Gameboard(scale, difficultyLevel, gameCanvas);

document.addEventListener("keydown", event => gameboard.interact(event.key));