const domController = require("../dom/dom.js");
const createPlayer = require("../player/player.js");
const createGameBoard = require("../gameboard/gameboard.js");

const createGame = function (player1, player2) {
  console.log("na halo");
  const playerOne = createPlayer("fasz janos", "human", createGameBoard());
  const playerTwo = createPlayer("nagy gyerek", "ai", createGameBoard());
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
    domController.displayGameBoard(createGameBoard());
    console.log("na anm mukodik cs");
  };

  return { getPlayers, hasLost, initialize };
};

module.exports = createGame;
