class Ship {
  static HORIZONTAL_LINEUP = 0;
  static VERTICAL_LINEUP = 1;

  constructor(shipName, shipLength, shipLineUp) {
    this._shipName = shipName;
    this._shipLength = Number(shipLength);
    this._shipLineUp = shipLineUp;
    this._hits = Array(this._shipLength).fill(false);
    this._startPosition = {
      x: 0,
      y: 0,
    };
  }

  get shipName() {
    return this._shipName;
  }

  set shipName(shipName) {
    this._shipName = shipName;
  }

  get shipLength() {
    return this._shipLength;
  }

  set shipLength(shipLength) {
    if (!isNaN(Number(shipLength))) this._shipLength = shipLength;
    else alert('Используется недопустимый тип данных');
  }

  get shipLineUp() {
    return this._shipLineUp;
  }

  set shipLineUp(shipLineUp) {
    if (!isNaN(Number(shipLineUp))) this._shipLineUp = shipLineUp;
    else alert('Используется недопустимый тип данных');
  }

  get hits() {
    return this._hits;
  }
  
  set hits(hits) {
    this._hits = hits;
  }

  get startPosition() {
    return this._startPosition;
  }

  set startPosition({ x, y }) {
    if (typeof x === 'number' && typeof y === 'number') {
      this._startPosition = { x, y };
    } else alert('Используется недопустимый тип данных');
  }

  get startPositionX() {
    return this._startPosition.x;
  }

  set startPositionX(x) {
    if (typeof x === "number") this._startPosition.x = x;
    else alert('Используется недопустимый тип данных');
  }

  get startPositionY() {
    return this._startPosition.y;
  }

  set startPositionY(y) {
    if (typeof y === "number") this._startPosition.y = y;
    else alert('Используется недопустимый тип данных');
  }

  // Попадания по кораблю
  hit(indexPosition) {
    if (indexPosition >= 0 && indexPosition < this._shipLength) {
      this._hits[indexPosition] = true;
    } else {
      alert (`значение ${indexPosition} выходит за допустимые граничные значения длины корабля`);
    }
  }

  // Проверка потопления корабля
  isSunk() {
    return this._hits.every((hit) => hit === true);
  }

}

const shipName = prompt('Введите имя корабля');
const length = prompt('Введите длину коробля (число)');
const lineUp = prompt('Введите ориентацию корабля (число 0 горизонтально или 1 вертикально)');

let ship = new Ship(shipName, length, lineUp);
ship.hit(0);
ship.hit(1);
console.log(ship._shipName, ',', ship._shipLength, ',', ship._shipLineUp, ',', ship.isSunk());