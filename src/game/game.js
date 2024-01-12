const domController = require("../dom/dom.js");
const createPlayer = require("../player/player.js");
const createGameBoard = require("../gameboard/gameboard.js");
const createShip = require("../ship/ship.js");

const createGame = function (player1, player2) {
  const playerOne = createPlayer("fasz janos", "human", createGameBoard());
  const playerOneGameBoard = playerOne.getGameBoard();
  const playerTwo = createPlayer("nagy gyerek", "ai", createGameBoard());
  const playerTwoGameBoard = playerTwo.getGameBoard();
  let currentPlayer = null;

  const getPlayers = () => {
    return [playerOne, playerTwo];
  };

  const hasLost = (player) => {
    const ships = player.getShips();
    if (ships) {
      return ships.every((e) => e.getSunkStatus());
    }
  };

  const initialize = () => {
    createPlayerShips(playerOne);
    playerOne.placeShip(playerOne.getShips()[0], 0, 0, "horizontal");
    playerOne.placeShip(playerOne.getShips()[0], 0, 1, "vertical");

    domController.displayGameBoard(playerOneGameBoard, 1);
    domController.displayGameBoard(playerTwoGameBoard, 2);
    console.log(playerOne.getShips());
    domController.updateTile(playerOneGameBoard, 0, 1);
  };
  // 1 x 4 , 2 x 3 , 3 x 2 , 4 x 1
  const createPlayerShips = (player) => {
    const ships = [];
    const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    lengths.forEach((length) => {
      ships.push(createShip(length));
    });
    player.setShips(ships);
  };

  return { getPlayers, hasLost, initialize };
};

module.exports = createGame;
