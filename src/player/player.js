const createPlayer = function (name, type, gameBoard) {
  let ai = null;
  if (type === "ai") {
    ai = createAi();
  }
  if (!name || name === "") throw new Error("please input a name");
  const playerName = name;
  const getPlayerName = () => {
    return name;
  };
  const playerType = type;
  const getPlayerType = () => {
    return type;
  };

  const ships = [];
  const getShips = () => {
    return ships;
  };
  const addShip = (ship) => {
    ships.push(ship);
  };

  const attackBoard = (board, x, y) => {
    board.takeHit(x, y);
  };

  const placeShip = (ship, x, y, direction) => {
    gameBoard.addShip(ship, x, y, direction);
  };

  return {
    getPlayerName,
    getPlayerType,
    placeShip,
    getShips,
    addShip,
    attackBoard,
    ai,
  };
};

const createAi = function () {
  const shotTiles = [];

  const getShotTiles = () => {
    return shotTiles;
  };

  const registerShotTile = (tile) => {
    tilesShotAt.push(tile);
  };

  const makeRandomMove = (gameBoard) => {};

  const placeRandomShip = (ship, gameBoard) => {
    const x = 3;
    const y = 4;

    gameBoard.addShip(ship, x, y, "horizontal");
  };

  return { placeRandomShip, makeRandomMove, registerShotTile, getShotTiles };
};

module.exports = createPlayer;
