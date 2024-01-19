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
  let gameStarted = false;
  let shipDirection = "horizontal"
  let testField = document.getElementById("test-field")
  testField.textContent = `ship direction: ${shipDirection}`;
  document.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (e.key === "r") changeShipDirection(); 
  })

  const getPlayers = () => {
    return [playerOne, playerTwo];
  };

  const changeShipDirection = () => {
    shipDirection = shipDirection === "horizontal" ? "vertical" : "horizontal";
    testField.textContent = `ship direction: ${shipDirection}`;
  }

  const hasLost = (player) => {
    const ships = player.getShips();
    if (ships) {
      return ships.every((e) => e.getSunkStatus());
    }
  };

  const initialize = () => {
    currentPlayer = playerOne;

    createPlayerShips(playerOne);
    createPlayerShips(playerTwo);

    domController.displayGameBoard(playerOneGameBoard, 1, handleTileClicked);
    domController.displayGameBoard(playerTwoGameBoard, 2, handleTileClicked);

  };

  const handleTileClicked = (event) => {
    const playerShips = currentPlayer.getShips();
    const nextShip = currentPlayer.getNextShipToPlace();
    if(nextShip > playerShips.length - 1) return
    const targetCoords = event.target.dataset.coordinates.split("-");
    currentPlayer.placeShip(currentPlayer.getPlayerNumber(), playerShips[nextShip], Number(targetCoords[1]), Number(targetCoords[0]), shipDirection )
    // changeCurrentPlayer();
  }

  // 1 x 4 , 2 x 3 , 3 x 2 , 4 x 1
  const createPlayerShips = (player) => {
    const ships = [];
    const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    lengths.forEach((length) => {
      ships.push(createShip(length));
    });
    player.setShips(ships);
  };

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  return { getPlayers, hasLost, initialize };
};

module.exports = createGame;
