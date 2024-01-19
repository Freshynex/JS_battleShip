const domController = require("../dom/dom.js");
const createPlayer = require("../player/player.js");
const createGameBoard = require("../gameboard/gameboard.js");
const createShip = require("../ship/ship.js");

const createGame = function (player1, player2) {
  const initialize = () => {
    const playerOne = createPlayer("fasz janos", "human", createGameBoard());
    const playerOneGameBoard = playerOne.getGameBoard();
    const playerTwo = createPlayer("nagy gyerek", "ai", createGameBoard());
    const playerTwoGameBoard = playerTwo.getGameBoard();
    createPlayerShips(playerOne);
    createPlayerShips(playerTwo);
    // playerOne.placeShip(playerOne.getShips()[0], 1, 0, "horizontal");

    domController.displayGameBoard(playerOneGameBoard, 1);
    domController.displayGameBoard(playerTwoGameBoard, 2);

    playerOne.placeShip(playerOne.getShips()[0], 0, 0, "vertical");
    playerOne.attackBoard(playerTwoGameBoard, 1, 1);
    playerTwo.attackBoard(playerOneGameBoard, 0, 0);
    console.log(playerOne.getShotTiles());
    console.log(playerTwo.getShotTiles());
    console.log({ playerOne, playerTwo });
    console.log(playerOneGameBoard.findCoordinates(0, 0));
  };

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
