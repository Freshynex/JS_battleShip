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

  const addShip = (p, ship, x, y, direction) => {
    const length = ship.getShipLength();
    const coords = calculateShipCoordinates(length, x, y, direction);

    if (coords === null) {
      throw new Error("out of bounds");
    } else if (coords.some((tile) => tile.tileContent.type === "ship")) {
      throw new Error("ship already present on selected tile");
    }
    // else if (
    //   coords.some((tile) => {
    //     conso
    //     console.log(shipInSurroundingTiles(tile));
    //     shipInSurroundingTiles(tile);
    //   })
    // )
    else if (coords.some((tile) => shipInSurroundingTiles(tile))) {
      throw new Error("must be atleast 1 tile between ships");
    }

    ships.push(ship);
    addShipToBoard(p, ship, coords);
  };

  const shipInSurroundingTiles = (tile) => {
    const coordinates = tile.coordinates;
    const adjacentTiles = getAdjacentTiles(
      getCoordinates(),
      coordinates[0],
      coordinates[1]
    );
    if (adjacentTiles.some((tile) => tile.tileContent.type == "ship")) {
      return true;
    }
    return false;
  };

  const getAdjacentTiles = (matrix, rowIndex, columnIndex) => {
    const adjacentIndices = [];

    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
        // Check if the indices are within bounds
        if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[i].length) {
          // Exclude the current index
          if (!(i === rowIndex && j === columnIndex)) {
            adjacentIndices.push(findCoordinates(i, j));
          }
        }
      }
    }

    return adjacentIndices;
  };

  const calculateShipCoordinates = (length, x, y, direction) => {
    const coords = [];

    for (let i = 0; i < length; i++) {
      try {
        if (direction === "horizontal") {
          // findCoordinate will throw an error if board limit is reached
          coords.push(findCoordinates(x, y + i));
        } else if (direction === "vertical") {
          coords.push(findCoordinates(x + i, y));
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

  const addShipToBoard = (p, ship, coords) => {
    coords.forEach((e) => {
      domController.updateTile(p, "ship", e.coordinates[0], e.coordinates[1]);
      e.tileContent.type = "ship";
      e.tileContent.value = ship;
    });
  };

  const takeHit = (p, x, y) => {
    let coords;
    try {
      coords = findCoordinates(x, y);
      tile = coords.tileContent;
      if (tile.type === "hit" || tile.type === "miss")
        throw new Error("already attacked this tile");
      if (tile.type === "ship") {
        tile.type = "hit";
        tile.value.takeDamage();
        domController.updateTile(p, "shipHit", x, y);
        return true;
      } else {
        tile.type = "miss";
        domController.updateTile(p, "shot", x, y);

        return false;
      }
    } catch (e) {
      domController.displayError(e);
    }
  };

  return { getCoordinates, findCoordinates, getShips, addShip, takeHit };
};

module.exports = createGameBoard;
