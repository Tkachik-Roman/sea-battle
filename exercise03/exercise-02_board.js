import Ship from "./exercise-01_ship.js"

export default class Board {
  constructor(size) {
    this._size = parseInt(size);
    this._grid = [];
    for (let i = 0; i < this._size; i++) {
      this._grid[i] = new Array(this._size).fill(null);
    }
    this._ships = [];
  }

  get boardSize() {
    return this._size;
  }

  set boardSize(size) {
    if (!isNaN(Number(size))) {
      this._size = size;
      for (let i = 0; i < size; i++) {
        this._grid[i] = new Array(size).fill(null);
      }
    } else alert('Используется недопустимый тип данных');
  }

  get ships() {
    return this._ships;
  }

  set ships(newShip) {
    this._ships.push(newShip);
  }

  get grid() {
    return this._grid;
  }

  set grid(newGrid) {
    if (
        Array.isArray(newGrid) &&
        newGrid.length === this._size &&
        newGrid.every((row) => Array.isArray(row) && row.length === this._size)
    ) this._grid = newGrid;
  }

  isShipPositionValid(ship, x, y) {
    if (x < 0 || y < 0 || x >= this._size || y>= this._size) return false;

    for (let i = 0; i < ship.shipLength; i++) {
      if (ship.lineUp === Ship.HORIZONTAL_LINEUP) {
        if (y >= this._size) return false;
        y++;
      } else {
        if (x >= this._size) return false;
        x++;
      }
    }
    return true;
  }

  findAvailableCells() {
    let arrayStoringEmptyCells = [];
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        if (this._grid[i][j] === null) arrayStoringEmptyCells.push({i, j});
      }
    }
    return arrayStoringEmptyCells;
  }

  placeShip(ship, x, y) {
    if (!this.isShipPositionValid(ship, x, y)) {
      alert ('Введенные исходные данные не верны. Координаты расположения корабля выходят за пределы доски. Требуется повторный ввод данных');
      return;
    } else if (this._ships.some((existingShip) => existingShip.shipName === ship.shipName)) {
      alert ('Корабль размесить нельзя, потому что на игровом поле уже находится корабль с таким именем');
      return;
    } else {
      ship.startPosition = { x, y };
      this.ships = ship;
      for (let i = 0; i < ship.shipLength; i++) {
        this._grid[y][x] = 'S';
        if (ship.shipLineUp === Ship.HORIZONTAL_LINEUP) {x++} else {y++};
      }
    }
  }

  receiveAttack(x, y) {
    if (this._grid[x][y] === "S") {
      for (let ship of this._ships) {
        let startX = ship.startPositionX;
        let startY = ship.startPositionY;
        for (let i = 0; i < ship.shipLength; i++) {
          if (startX === x && startY === y) {
            this._grid[x][y] = "X";
            ship.hit(i);
            return true;
          }
          if (ship.shipLineUp === Ship.HORIZONTAL_LINEUP) {startY++} else {startX++};
        }
      }
    }
    return false;
  }

  display() {
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        if (this._grid[i][j] === null) this._grid[i][j] = 'O';
        else if (this._grid[i][j] === false) this._grid[i][j] = 'S';
        else if (this._grid[i][j] === true) this._grid[i][j] = 'X';
      }
    }
    return this._grid;
  }

}