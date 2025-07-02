import Ship from "./exercise-01_ship.js"
import Player from "./exercise-03_player.js"

export default class App {
  constructor(boardSize, maxShipLength, maxNumberOfShipsOnBoard) {
    this._boardSize = boardSize;
    this._maxShipLength = maxShipLength;
    this._maxNumberOfShipsOnBoard = maxNumberOfShipsOnBoard;
    this._firstPlayer = new Player(prompt('Привет, давай начнем игру, введите имя первого игрока'), this._boardSize);
    this._secondPlayer = new Player(prompt('Введите имя второго игрока'), this._boardSize);
    this.winner = null;
  }

  get boardSize() {
    return this._boardSize;
  }

  set boardSize(newBoardSize) {
    this._boardSize = newBoardSize;
    this._firstPlayer.boardSize = newBoardSize;
    this._secondPlayer.boardSize = newBoardSize;
  }

  get maxShipLength() {
    return this._maxShipLength;
  }
  set maxShipLength(maxShipLength) {
    this._maxShipLength = maxShipLength;
  }

  get maxNumberOfShipsOnBoard() {
    return this._maxNumberOfShipsOnBoard;
  }
  set maxNumberOfShipsOnBoard(maxNumberOfShipsOnBoard) {
    this._maxNumberOfShipsOnBoard = maxNumberOfShipsOnBoard;
  }

  // Запрос параметров кораблей и их расстановка на игровом поле
  shipArrangement(player, shipCount, maxShipLength) {
    for (let i = 0; i < shipCount; i++) {
      let validInput = false;
      while (!validInput) {
        let shipName = prompt(`Игрок "${player.playerName}", введите название корабля`);
        let shipLength = parseInt(prompt(`Игрок "${player.playerName}", введите длину корабля`));
        let shipLineUp = parseInt(prompt(`Игрок "${player.playerName}", ведите ориентацию корабля (0 - горизонтальное, 1 - вертикальное)`));
        let x = parseInt(prompt(`Игрок "${player.playerName}", введите координату Х`));
        let y = parseInt(prompt(`Игрок "${player.playerName}", введите координату Y`));

        if (isNaN(shipLength) || shipLength <= 0 || shipLength > maxShipLength) {
          alert('Длина корабля должна быть целым положительным числом, больше 0 и не больше максимальной длины корабля');
          continue;
        }

        if (isNaN(x) || isNaN(y) || x < 0 || y < 0 || x >= this._boardSize || y >= this._boardSize) {
          alert('Координаты должны быть положительными целыми числами и не превышать значение величины игровой доски');
          continue;
        }

        if (isNaN(shipLineUp) || !(shipLineUp === 0 || shipLineUp === 1)) {
          alert('Ориентация корабля должна быть целым числом либо 0 либо 1');
          continue;
        }

        let newShip = new Ship(shipName, shipLength, shipLineUp);
        newShip.startPosition = { x, y };
        player._board.placeShip(newShip, x, y);
        validInput = true;
      }
    }
  }

  // Управление игровым процессом
  run() {
    // Размещение кораблей
    this.shipArrangement(
      this._firstPlayer,
      this._maxNumberOfShipsOnBoard,
      this._maxShipLength
    );

    this.shipArrangement(
      this._secondPlayer,
      this._maxNumberOfShipsOnBoard,
      this._maxShipLength
    );

    let gameContinues = true;

    while (gameContinues) {
      let playerOneTurn = this._firstPlayer.takeTurn(this._secondPlayer);
      this._secondPlayer._board.receiveAttack(playerOneTurn.x, playerOneTurn.y);

      if (this.isAllShipsSunk(this._secondPlayer)) {
        gameContinues = false;
        this.winner = this._firstPlayer.playerName;
        console.log('Игрок ' + '\"' + this._firstPlayer.playerName + '\"' + ' выиграл сражение');
        break;
      }

      let playerTwoTurn = this._secondPlayer.takeTurn(this._firstPlayer);
      this._firstPlayer._board.receiveAttack(playerTwoTurn.x, playerTwoTurn.y);

      if (this.isAllShipsSunk(this._firstPlayer)) {
        gameContinues = false;
        this.winner = this._secondPlayer._name;
        console.log('Игрок ' + '\"' + this._secondPlayer.playerName + '\"' + ' выиграл сражение');
        break;
      }
    }
  }

  // Проверка потопления всех кораблей игрока
  isAllShipsSunk(player) {
    let shipsInspect = player._board.ships;
    for (let ship of shipsInspect) {
      if (!ship.hits.every((hit) => hit === true)) {
        return false;
      }
    }
    return true;
  }
}

// Тестовый сценарий
let appTest = new App(5, 3, 1);

appTest.run();

console.log(
  appTest._firstPlayer.playerName,
  appTest.maxNumberOfShipsOnBoard,
  appTest._firstPlayer._board.ships[0].shipLength,
  appTest._firstPlayer._board.ships[0].startPosition,
  appTest._firstPlayer._board.ships[0].shipLineUp
);

console.log(
  appTest._secondPlayer.playerName,
  appTest.maxNumberOfShipsOnBoard,
  appTest._secondPlayer._board.ships[0].shipLength,
  appTest._secondPlayer._board.ships[0].startPosition,
  appTest._secondPlayer._board.ships[0].shipLineUp
);

console.log(appTest.winner);

console.log(
  `Финальная игровая доска игрока под именем ${appTest._firstPlayer.playerName}`,
  appTest._firstPlayer._board.display()
);

console.log(
  `Финальная игровая доска игрока под именем ${appTest._secondPlayer.playerName}`,
  appTest._secondPlayer._board.display()
);