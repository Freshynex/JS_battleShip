const domController = require("../dom/dom");
let nextPlayerNumber = 1;

const createPlayer = function (name, type, gameBoard) {
  // add ai object if needed
  let ai = null;
  if (type === "ai") {
    ai = createAi();
  }

  const getGameBoard = () => {
    return gameBoard;
  };

  const playerNumber = nextPlayerNumber;
  const getPlayerNumber = () => {
    return playerNumber;
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

  const placeShip = (ship, x, y, direction) => {
    gameBoard.addShip(ship, x, y, direction);
  };

  const attackBoard = (board, x, y) => {
    const result = board.takeHit(x, y);
    console.log("result " + result);
    if (result === true) {
      shotTiles.hits.push([x, y]);
    } else if (result === false) {
      shotTiles.misses.push([x, y]);
    }
  };

  const shotTiles = { misses: [], hits: [] };
  const getShotTiles = () => {
    return shotTiles;
  };

  nextPlayerNumber += 1;

  return {
    getShotTiles,
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

  // code extension idea JS plugin that automatically makes a getter / setter like in html
  const placedTiles = [];
  const getPlacedTiles = () => {
    return placedTiles;
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

  return {
    placeRandomShip,
    makeRandomMove,
    registerShotTile,
    getPlacedTiles,
  };
};

module.exports = createPlayer;
