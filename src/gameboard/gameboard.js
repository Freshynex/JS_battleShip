const { directive } = require("@babel/types");
const createShip = require("../ship/ship.js");
const domController = require("../dom/dom.js");

const createGameBoard = function () {
  const coordinates = new Array(10).fill(null).map(() => {
    return new Array(10).fill(null).map(() => ({ type: "empty", value: null }));
  });
  const getCoordinates = () => {
    return coordinates;
  };
  const findCoordinates = (x, y) => {
    if (x >= coordinates.length || y >= coordinates.length) {
      throw new Error("out of bounds");
    }
    return { coordinates: [x, y], tileContent: coordinates[x][y] };
  };

  const ships = [];
  const getShips = () => {
    return ships;
  };

  const addShip = (ship, x, y, direction) => {
    const length = ship.getShipLength();
    const coords = calculateShipCoordinates(length, x, y, direction);

    if (coords === null) {
      // Handle invalid move
      throw new Error("out of bounds");
    } else if (coords.some((tile) => tile.type === "ship")) {
      throw new Error("ship already present on selected tile");
    }

    ships.push(ship);
    addShipToBoard(ship, coords);
  };

  const calculateShipCoordinates = (length, x, y, direction) => {
    const coords = [];
    for (let i = 0; i < length; i++) {
      try {
        if (direction === "horizontal") {
          // findCoordinate will throw an error if board limit is reached
          coords.push(findCoordinates(x + i, y));
        } else if (direction === "vertical") {
          coords.push(findCoordinates(x, y + i));
        } else {
          throw new Error("invalid direction");
        }
        // if findCoordinate returns error
      } catch {
        return null;
      }
    }
    // if all coordinates are valid
    return coords;
  };

  const addShipToBoard = (ship, coords) => {
    coords.forEach((e) => {
      domController.updateTile("ship", e.coordinates[0], e.coordinates[1]);
      e.tileContent.type = "ship";
      e.tileContent.value = ship;
    });
  };

  const takeHit = (x, y) => {
    let coords;
    try {
      coords = findCoordinates(x, y);
      if (coords.type === "hit" || coords.type === "miss")
        throw new Error("already attacked this tile");
      if (coords.type === "ship") {
        coords.type = "hit";
        coords.value.takeDamage();
      } else {
        coords.type = "miss";
      }
    } catch (e) {
      throw e;
    }
  };

  return { getCoordinates, findCoordinates, getShips, addShip, takeHit };
};

module.exports = createGameBoard;
