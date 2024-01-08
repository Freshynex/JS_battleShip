const { create } = require('domain');
const createGameBoard = require('../src/gameboard/gameboard.js');
const createShip = require('../src/ship/ship.js');

describe("GameBoard object", () => {
    let gameBoard;

    beforeEach(() => {
        gameBoard = createGameBoard();
    })
    it("has 10 columns and 10 rows (x, y)", () => {
        let coordinates = gameBoard.getCoordinates();
        expect(coordinates).toBeDefined()
        expect(coordinates.length).toBe(10)
        expect(coordinates[0].length).toBe(10)
    })
    it("each tile is 'empty' when instantiated", () => {
        expect(gameBoard.getCoordinates()
        .every((coord) => coord.every((tile) => tile.type === "empty")))
        .toBe(true)
    })
    it("can add ships to given coordinates horizontally", () => {
        const coordinates = { x: 1, y: 1};
        const ship = createShip(3);
        gameBoard.addShip(ship, coordinates.x, coordinates.y, 'horizontal');
        expect(gameBoard.findCoordinates(coordinates.x, coordinates.y)).toEqual({ type: 'ship'})
        expect(gameBoard.findCoordinates(coordinates.x + 1, coordinates.y)).toEqual({ type: 'ship'})
        expect(gameBoard.findCoordinates(coordinates.x + 2, coordinates.y)).toEqual({ type: 'ship'})
    })
    it("can add ships to given coordinates vertically", () => {
        const coordinates = { x: 1, y: 1};
        const ship = createShip(3);
        gameBoard.addShip(ship, coordinates.x, coordinates.y, 'vertical');
        expect(gameBoard.findCoordinates(coordinates.x, coordinates.y)).toEqual({ type: 'ship'})
        expect(gameBoard.findCoordinates(coordinates.x, coordinates.y + 1)).toEqual({ type: 'ship'})
        expect(gameBoard.findCoordinates(coordinates.x, coordinates.y + 2)).toEqual({ type: 'ship'})
    })
    it("cannot add ships beyond board constraints", () => {
        const coordinates = { x: 9, y: 1};
        const ship = createShip(3);
        gameBoard.addShip(ship, coordinates.x, coordinates.y, 'horizontal')
        expect(gameBoard.findCoordinates(coordinates.x, coordinates.y).type).toEqual("empty");
    })
    it("same when direction is vertical", () => {
        const coordinates = { x: 1, y: 9};
        const ship = createShip(3);
        gameBoard.addShip(ship, coordinates.x, coordinates.y, 'vertical')
        expect(gameBoard.findCoordinates(coordinates.x, coordinates.y).type).toEqual("empty");
    })
})