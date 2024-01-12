const createPlayer = function (name, type, gameBoard) {
    if (!name || name.length === 0) throw new Error("name must be given")
    if (!type || type !== "human" && type !== "computer") throw new Error("must be human or computer")
    // console.warn(type !== "human" && type !== "computer")
    const playerName = name;
    const getPlayerName = () => { return name };
    const playerType = type;
    const getPlayerType = () => { return type };

    const ships = [];
    const getShips = () => { return ships }
    const addShip = (ship) => { ships.push(ship) }

    const placeShip = (ship, x, y, direction) => {
        gameBoard.addShip(ship, x, y, direction);
    }
    
    return { getPlayerName, getPlayerType, placeShip, getShips, addShip }

}

module.exports = createPlayer;