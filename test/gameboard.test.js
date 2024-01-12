const { create } = require("domain");
const createGameBoard = require("../src/gameboard/gameboard.js");
const createShip = require("../src/ship/ship.js");
const { findCacheDir } = require("webpack-dev-server");

describe("GameBoard object", () => {
  let gameBoard;
  let ship1;
  let ship2;

  beforeEach(() => {
    gameBoard = createGameBoard();
    ship1 = createShip(3);
    ship2 = createShip(2);
  });
  it("has 10 columns and 10 rows (x, y)", () => {
    let coordinates = gameBoard.getCoordinates();
    expect(coordinates).toBeDefined();
    expect(coordinates.length).toBe(10);
    expect(coordinates[0].length).toBe(10);
  });
  it("each tile is 'empty' when instantiated", () => {
    expect(
      gameBoard
        .getCoordinates()
        .every((coord) => coord.every((tile) => tile.type === "empty"))
    ).toBe(true);
  });
  it("can add ships to given coordinates horizontally", () => {
    const coordinates = { x: 1, y: 1 };
    gameBoard.addShip(ship1, coordinates.x, coordinates.y, "horizontal");
    expect(gameBoard.findCoordinates(coordinates.x, coordinates.y)).toEqual({
      type: "ship",
      value: ship1,
    });
    expect(gameBoard.findCoordinates(coordinates.x + 1, coordinates.y)).toEqual(
      { type: "ship", value: ship1 }
    );
    expect(gameBoard.findCoordinates(coordinates.x + 2, coordinates.y)).toEqual(
      { type: "ship", value: ship1 }
    );
  });
  it("can add ships to given coordinates vertically", () => {
    const coordinates = { x: 1, y: 1 };
    gameBoard.addShip(ship1, coordinates.x, coordinates.y, "vertical");
    expect(gameBoard.findCoordinates(coordinates.x, coordinates.y)).toEqual({
      type: "ship",
      value: ship1,
    });
    expect(gameBoard.findCoordinates(coordinates.x, coordinates.y + 1)).toEqual(
      { type: "ship", value: ship1 }
    );
    expect(gameBoard.findCoordinates(coordinates.x, coordinates.y + 2)).toEqual(
      { type: "ship", value: ship1 }
    );
  });
  it("cannot add ship if it overlaps an already placed ship", () => {
    const coordinates1 = { x: 1, y: 1 };
    const coordinates2 = { x: 3, y: 1 };
    gameBoard.addShip(ship1, coordinates1.x, coordinates1.y, "horizontal");
    expect(() => {
      gameBoard.addShip(ship2, coordinates2.x, coordinates2.y, "vertical");
    }).toThrow("ship already present on selected tile");
  });
  it("cannot add ships beyond board constraints", () => {
    const coordinates = { x: 9, y: 1 };
    expect(() => {
      gameBoard.addShip(ship1, coordinates.x, coordinates.y, "horizontal");
    }).toThrow();
  });
  it("same when direction is vertical", () => {
    const coordinates = { x: 1, y: 9 };
    expect(() => {
      gameBoard.addShip(ship1, coordinates.x, coordinates.y, "vertical");
    }).toThrow();
  });
  it("returns the list of ships on the game board", () => {
    gameBoard.addShip(ship1, 1, 1, "horizontal");
    gameBoard.addShip(ship2, 4, 4, "vertical");
    expect(gameBoard.getShips()).toEqual([ship1, ship2]);
  });
  it("can take a hit", () => {
    gameBoard.takeHit(1, 2);
    expect(gameBoard.findCoordinates(1, 2).type).toBe("miss");
  });
  it("can tell if a ship was hit", () => {
    gameBoard.addShip(ship1, 1, 2, "horizontal");
    gameBoard.takeHit(1, 2);
    expect(gameBoard.findCoordinates(1, 2)).toEqual({
      type: "hit",
      value: ship1,
    });
    expect(ship1.getHp()).toBe(2);
  });
  it("cannot receive attack on the same tile twice", () => {
    gameBoard.addShip(ship1, 4, 5, "horizontal");
    // attack empty tile
    gameBoard.takeHit(1, 2);
    // attack ship tile
    gameBoard.takeHit(4, 5);
    expect(() => {
      gameBoard.takeHit(1, 2);
    }).toThrow("already attacked this tile");
    expect(() => {
      gameBoard.takeHit(4, 5);
    }).toThrow("already attacked this tile");
  });
});
