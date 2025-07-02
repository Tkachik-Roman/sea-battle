import Player from "./exercise-03_player.js"

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