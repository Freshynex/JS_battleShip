const createPlayer = function (name, type, gameBoard) {
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
  };
};

module.exports = createPlayer;
