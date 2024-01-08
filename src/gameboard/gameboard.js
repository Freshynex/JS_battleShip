const { directive } = require('@babel/types');
const createShip = require('../ship/ship.js')

const createGameBoard = function () {
    const coordinates = new Array(10).fill(null).map(() => {
        return (new Array(10).fill(null).map(() => ({ type: "empty" })))
    });
    const getCoordinates = () => { return coordinates }
    const findCoordinates = (x, y) => { 
        if( x >= coordinates.length || y >= coordinates.length) { throw new Error ('out of bounds')}
        return coordinates[x][y] 
    }
    
    const ships = [];
    const getShips = () => { return ships }

    const addShip = (ship, x, y, direction) => {
        const length = ship.getShipLength()
        const coords = calculateShipCoordinates(length, x, y, direction);

        if (coords === null) {
            // Handle invalid move
            return;
        }

        addShipToBoard(coords);
    }

    const calculateShipCoordinates = (length, x, y, direction) => {
        const coords = [];
        for(let i = 0; i <= length; i++) {
            try {
                if(direction === "horizontal"){
                    // findCoordinate will throw an error if board limit is reached
                    coords.push(findCoordinates(x + i, y));
                } 
                else if(direction === "vertical") {
                    coords.push(findCoordinates(x, y + i))
                } else { throw new Error ('invalid direction') }
                // if findCoordinate returns error
            } catch { return null }
        }
        // if all coordinates are valid
        return coords;
    }
    
    const addShipToBoard = (coords) => {
        coords.forEach((e) => e.type = "ship");
    }

    return { getCoordinates, findCoordinates, getShips, addShip }
}

module.exports = createGameBoard;