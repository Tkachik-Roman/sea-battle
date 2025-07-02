import Ship from "./exercise-01_ship.js"
import Board from "./exercise-02_board.js"

export default class Player {
  constructor(name, boardSize) {
    this._playerName = name;
    this._boardSize = boardSize;
    this._board = new Board(boardSize);
  }

  get playerName() {
    return this._playerName;
  }
  set playerName(newPlayerName) {
    this._playerName = newPlayerName;
  }

  get boardSize() {
    return this._boardSize;
  }

  set boardSize(newBoardSize) {
    if (typeof newBoardSize !== 'number' || newBoardSize <= 0) alert ('Используется недопустимый тип данных');
    this._boardSize = newBoardSize;
  }

  get board() {
    return this._board;
  }

  // Размещение корабля на игровой доске
  placeShips(shipName, length, isVertical, x, y) {
    let ship = new Ship(shipName, length, isVertical);
    this._board.placeShip(ship, x, y);
  }

  // Ввода игроком (оппонентом) координат атаки на корабль оппонента
  takeTurn(opponent) {
    let playerInput = prompt(`${this._playerName} Введите через пробел координаты атаки (например, 0 0)`);
    let attackCoordinates = playerInput.split(" ");
    let x = parseInt(attackCoordinates[0]);
    let y = parseInt(attackCoordinates[1]);
    if (attackCoordinates.length !== 2 || isNaN(x) || isNaN(y)) {
      alert("Неправильный ввод. Повторите ввод с правильным указанием координат атаки");
      return this.takeTurn(opponent);
    }
    return {
      x: x,
      y: y,
      opponent: opponent,
    };
  }
}

let playerInput = prompt('Введите через пробел \"Имя игрока\" и \"Длину игровой доски\"');
let playerInputArray = playerInput.split(' ');
let player = new Player(playerInputArray[0], playerInputArray[1]);
console.log('\"' + player._playerName + '\"' + ', ' + player._boardSize);