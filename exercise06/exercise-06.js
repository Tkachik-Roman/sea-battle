import Player from "./exercise-03_player.js"

export default class AIPlayer extends Player {
  constructor(boardSize) {
    super('AIPlayer', boardSize);
  }

  generatedRandomNumber(number) {
    return Math.floor(number * Math.random());
  }

  placeShips(length, isVertical, x, y) {
    length = this.generatedRandomNumber(4) + 1;
    isVertical = Math.round(Math.random());
    x = this.generatedRandomNumber(this.board.boardSize);
    y = this.generatedRandomNumber(this.board.boardSize);
    return super.placeShips('AIShip', length, isVertical, x, y);
  }

  // Генерирование координат атаки случайным образом
  takeTurn(opponent) {
    let x = this.generatedRandomNumber(this.board.boardSize);
    let y = this.generatedRandomNumber(this.board.boardSize);
    return {
      x: x,
      y: y,
      opponent: opponent
    };
  }

}

// Тестовый сценарий
const aiPlayer = new AIPlayer(5);
console.log(`\"${aiPlayer.playerName}\"`);