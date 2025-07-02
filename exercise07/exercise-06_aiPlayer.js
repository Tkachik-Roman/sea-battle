import Player from "./exercise-03_player.js"

export default class AIPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
  }

  generatedRandomNumber(number) {
    return Math.floor(number * Math.random());
  }

  placeShips(shipName, length, isVertical, x, y) {
    super.placeShips(shipName, length, isVertical, x, y);
  }

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