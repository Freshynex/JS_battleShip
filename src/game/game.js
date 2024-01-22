const domController = require("../dom/dom.js");
const createPlayer = require("../player/player.js");
const createGameBoard = require("../gameboard/gameboard.js");
const createShip = require("../ship/ship.js");

const createGame = function (player1, player2) {
  let gameStarted = false;
  let winner = null;
  let currentPlayer = null;
  let nextShipIndex;
  const playerOne = createPlayer("fasz janos", "human", createGameBoard());
  const playerOneGameBoard = playerOne.getGameBoard();
  const playerTwo = createPlayer("nagy gyerek", "ai", createGameBoard());
  const playerTwoGameBoard = playerTwo.getGameBoard();
  const getPlayers = () => {
    return [playerOne, playerTwo];
  };

  let allShipsPlaced = false;
  let testField = document.getElementById("test-field");
  let startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", () => {
    startGame();
  });
  let shipLengthContainer = document.getElementById("nextShipField");

  const initialize = () => {
    allShipsPlaced = false;
    gameStarted = false;

    currentPlayer = playerOne;
    createPlayerShips(playerOne);
    createPlayerShips(playerTwo);
    shipLengthContainer.textContent = `next ship length: ${getNextShipLength()}`;
    domController.displayGameBoard(playerOneGameBoard, 1, handleTileClicked);
    domController.displayGameBoard(playerTwoGameBoard, 2, handleTileClicked);
    if (playerTwo.isAi()) placeAiShips();
  };

  const getNextShipLength = () => {
    nextShipIndex = currentPlayer.getNextShipToPlace();
    if (!currentPlayer.getShips()[nextShipIndex]) return;
    let nextShipLength = currentPlayer
      .getShips()
      [nextShipIndex].getShipLength();
    return nextShipLength;
  };

  const placeAiShips = () => {
    const playerShips = playerOne.getShips();
    // next ship index ( initially 0 )
    let nextShip = 0;
    // check if placeRandomShip was succesful
    let result;
    console.log(nextShip < playerShips.length - 1);
    while (nextShip < playerShips.length - 1) {
      nextShip = playerTwo.getNextShipToPlace();

      while (!result) {
        result = playerTwo.placeRandomShip(
          playerTwo.getPlayerNumber(),
          playerShips[nextShip]
        );
      }
      result = null;
    }
  };

  const startGame = () => {
    if (!allShipsPlacedCheck()) {
      domController.displayError("place all ships first!");
      return;
    }

    gameStarted = true;
    testField.textContent = "game in progress";
    console.log("game started!");
  };

  const endGame = () => {
    winner = currentPlayer;
    testField.textContent = `${winner.getPlayerName()} wins`;
  };

  const allShipsPlacedCheck = () => {
    let nextShip = currentPlayer.getShips()[currentPlayer.getNextShipToPlace()];
    if (!nextShip) return true;
  };

  let shipDirection = "horizontal";
  document.addEventListener("keydown", (e) => {
    if (e.key === "r") changeShipDirection();
  });
  const changeShipDirection = () => {
    shipDirection = shipDirection === "horizontal" ? "vertical" : "horizontal";
    testField.textContent = `placing ships, ship direction: ${shipDirection}`;
  };

  testField.textContent = `placing ships, ship direction: ${shipDirection}`;

  const handleTileClicked = (event) => {
    // handle player current ship index
    if (gameStarted) {
      handleAttackClick(event);
      return;
    }
    const playerShips = currentPlayer.getShips();
    const nextShip = currentPlayer.getNextShipToPlace();

    if (nextShip > playerShips.length - 1) {
      allShipsPlaced = true;
      return;
    }

    const targetCoords = event.target.dataset.coordinates.split("-");
    currentPlayer.placeShip(
      currentPlayer.getPlayerNumber(),
      playerShips[nextShip],
      Number(targetCoords[1]),
      Number(targetCoords[0]),
      shipDirection
    );
    shipLengthContainer.textContent = getNextShipLength()
      ? `next ship length: ${getNextShipLength()}`
      : "";

    // changeCurrentPlayer();
  };

  const handleAttackClick = (event) => {
    const targetCoords = event.target.dataset.coordinates.split("-");
    const targetPlayer = getPlayers().filter((p) => p !== currentPlayer)[0];
    const targetGameBoard = targetPlayer.getGameBoard();
    if (
      currentPlayer.attackBoard(
        targetPlayer.getPlayerNumber(),
        targetGameBoard,
        Number(targetCoords[1]),
        Number(targetCoords[0])
      )
    ) {
      console.log("player lost: " + targetPlayer.allShipsSunk());
      targetPlayer.allShipsSunk()
        ? endGame()
        : console.log("- - - NEXT ROUND - - -");
      // if (targetPlayer.allShipsSunk()) endGame();
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

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  return { getPlayers, initialize };
};

module.exports = createGame;
