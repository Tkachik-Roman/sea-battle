import Player from "./exercise-03_player.js"

// Игрок-человек
export default class HumanPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
  }

  placeShips(shipName, length, isVertical, x, y) {
    super.placeShips(shipName, length, isVertical, x, y);
  }

  takeTurn(opponent) {
    return super.takeTurn(opponent);
  }

}

// Тестовый сценарий
let humanPlayerName = prompt('Введите имя игрока-человека');
let humanPlayer = new HumanPlayer(humanPlayerName, 5);
console.log(`\"${humanPlayer.playerName}\"`);