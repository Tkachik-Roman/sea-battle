import Ship from "./exercise-01_ship.js"
import HumanPlayer from "./exercise-05_humanPlayer.js"
import AIPlayer from "./exercise-06_aiPlayer.js"

export default class App {

  constructor(boardSize, maxShipLength, maxNumberOfShipsOnBoard) {
    const { playerOneOpponentType, playerTwoOpponentType} = this.getTypes();
    this._boardSize = boardSize;
    this._maxShipLength = maxShipLength;
    this._maxNumberOfShipsOnBoard = maxNumberOfShipsOnBoard;
    if (playerOneOpponentType === 1) {
      this._firstPlayer = new HumanPlayer(prompt('Начнем игру, введите имя первого игрока'), this._boardSize);
    } else {
        this._firstPlayer = new AIPlayer('AIMax', this._boardSize);
    }

    if (playerTwoOpponentType === 1) {
      this._secondPlayer = new HumanPlayer(prompt('Введите имя второго игрока'), this._boardSize);
    } else {
        this._secondPlayer = new AIPlayer('AIAlex', this._boardSize);
    }

    this.winner = null;
  }

  getTypes() {
    while (true) {
      const playerOneOpponentType = parseInt(prompt('Привет, введите тип 1го игрока (1 - человек, 0 - компьютер)'));
      const playerTwoOpponentType = parseInt(prompt('Введите тип 2го игрока-оппонента (1 - человек, 0 - компьютер)'));

      if ((playerOneOpponentType === 0 || playerOneOpponentType === 1) &&
          (playerTwoOpponentType === 0 || playerTwoOpponentType === 1)) {
        return {playerOneOpponentType, playerTwoOpponentType};
      } else {
        alert('Неправильный ввод. Введите 0 - игрок компьютер или 1 - игрок человек');
      }
    }
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

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  shipArrangement(player, shipCount, maxShipLength) {
    for (let i = 0; i < shipCount; i++) {
      if (player instanceof HumanPlayer) {
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

      } else if (player instanceof AIPlayer) {
        let shipAutomaticallyPlaced = false;
        while (!shipAutomaticallyPlaced) {
          let shipName = `AIShip № ${i}`;
          let shipLength = player.generatedRandomNumber(4) + 1;
          let shipLineUp = Math.round(Math.random());
          let x = player.generatedRandomNumber(player.boardSize);
          let y = player.generatedRandomNumber(player.boardSize);
          
          if (shipLineUp === 0 && x + shipLength <= player.boardSize && y + shipLength <= player.boardSize) {
            shipAutomaticallyPlaced = true;
          } else if (shipLineUp === 1 && x + shipLength <= player.boardSize && y + shipLength <= player.boardSize) {
            shipAutomaticallyPlaced = true;
          }
          if (shipAutomaticallyPlaced) {
            let newShip = new Ship(shipName, shipLength, shipLineUp);
            newShip.startPosition = { x, y };
            player._board.placeShip(newShip, x, y);    
            shipAutomaticallyPlaced = true;
          }
        }
      }
    }
  }

  async run() {
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
      
      await this.delay(1000);

      let playerOneTurn = await this._firstPlayer.takeTurn(this._secondPlayer);
      this._secondPlayer._board.receiveAttack(playerOneTurn.x, playerOneTurn.y);

      console.log(`\"${this._firstPlayer.playerName} (${playerOneTurn.x}, ${playerOneTurn.y})\"`);

      if (this.isAllShipsSunk(this._secondPlayer)) {
        gameContinues = false;
        this.winner = this._firstPlayer.playerName;
        console.log('\"' + this._firstPlayer.playerName + '\"');
        break;
      }

      await this.delay(1000);

      let playerTwoTurn = await this._secondPlayer.takeTurn(this._firstPlayer);
      this._firstPlayer._board.receiveAttack(playerTwoTurn.x, playerTwoTurn.y);

      console.log(`\"${this._secondPlayer.playerName} (${playerTwoTurn.x}, ${playerTwoTurn.y})\"`);

      if (this.isAllShipsSunk(this._firstPlayer)) {
        gameContinues = false;
        this.winner = this._secondPlayer._name;
        console.log('\"' + this._secondPlayer.playerName + '\"');
        break;
      }
    }
  }

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