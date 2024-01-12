const createPlayer = function (name, type, gameBoard) {
  // add ai object if needed
  let ai = null;
  if (type === "ai") {
    ai = createAi();
  }

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

  const attackBoard = (board, x, y) => {
    board.takeHit(x, y);
  };

  const placeShip = (ship, x, y, direction) => {
    gameBoard.addShip(ship, x, y, direction);
  };

  return {
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
