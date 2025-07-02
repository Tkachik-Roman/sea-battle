import Player from "./exercise-03_player.js"

export default class HumanPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
  }

  placeShips(shipName, length, isVertical, x, y) {
    super.placeShips(shipName, length, isVertical, x, y);
  }

  async takeTurn(opponent) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return super.takeTurn(opponent);
  }

}