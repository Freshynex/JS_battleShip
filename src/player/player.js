const domController = require("../dom/dom");
let nextPlayerNumber = 1;

const createPlayer = function (name, type, gameBoard) {
  // add ai object if needed
  let ai = null;
  if (type === "ai") {
    ai = createAi();
  }

  let nextShipToPlace = 0;
  const getNextShipToPlace = () => {
    return nextShipToPlace;
  };

  const getGameBoard = () => {
    return gameBoard;
  };

  // check name exists
  if (!name || name === "") throw new Error("please input a name");
  const playerName = name;
  const getPlayerName = () => {
    return name;
  };

  const playerType = type;
  const getPlayerType = () => {
    return type;
  };

  const playerNumber = nextPlayerNumber;
  const getPlayerNumber = () => {
    return playerNumber;
  };

  let ships = [];
  const getShips = () => {
    return ships;
  };

  const setShips = (inputShips) => {
    ships = inputShips;
  };

  const addShip = (ship) => {
    ships.push(ship);
  };

  const attackBoard = (p, board, x, y) => {
    console.log(p);
    // console.log(
    //   `attacking board of ${p.getPlayerNumber()}, at x: ${x} and y: ${y}`
    // );
    board.takeHit(p, x, y);
  };

  const placeShip = (p, ship, x, y, direction) => {
    try {
      gameBoard.addShip(p, ship, x, y, direction);
      nextShipToPlace += 1;
      domController.clearErrors();
    } catch (e) {
      domController.displayError(e);
    }
  };

  nextPlayerNumber++;

  return {
    getNextShipToPlace,
    getPlayerNumber,
    getPlayerName,
    getPlayerType,
    getGameBoard,
    placeShip,
    getShips,
    addShip,
    attackBoard,
    setShips,
    ai,
  };
};
// added to player object if needed
const createAi = function () {
  // so Ai does not shoot same tile twice
  const shotTiles = [];

  const getShotTiles = () => {
    return shotTiles;
  };

  const registerShotTile = (x, y) => {
    shotTiles.push([x, y]);
  };

  const makeRandomMove = (gameBoard) => {};

  const placeRandomShip = (ship, gameBoard) => {
    const maxNumber = 10;
    const x = Math.floor(Math.random() * maxNumber);
    const y = Math.floor(Math.random() * maxNumber);

    try {
      gameBoard.addShip(ship, x, y, "horizontal");
    } catch {
      placeRandomShip(ship, gameBoard);
    }
  };

  const attackRandomTile = (gameBoard) => {
    const maxNumber = 10;
    do {
      const x = Math.floor(Math.random() * maxNumber);
      const y = Math.floor(Math.random() * maxNumber);
    } while (shotTiles.includes([x, y]));

    try {
      gameBoard.takeHit(x, y);
      registerShotTile(x, y);
    } catch {
      attackRandomTile(gameBoard);
    }
  };

  return { placeRandomShip, makeRandomMove, registerShotTile, getShotTiles };
};

module.exports = createPlayer;
