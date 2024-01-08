const { create } = require("domain");

const createPlayer = function (name, type, gameBoard) {
    const playerName = name;
    const getPlayerName = () => { return name };
    const playerType = type;
    const getPlayerType = () => { return type };

    const ships = [];
    const getShips = () => { return ships } 

    const placeShip = (ship, x, y, direction) => {
        gameBoard.addShip(ship, x, y, direction);
    }
    
    return { getPlayerName, getPlayerType, placeShip, getShips }

}

module.exports = createPlayer;