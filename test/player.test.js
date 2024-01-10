const createPlayer = require("../src/player/player.js");
const createGameBoard = require("../src/gameboard/gameboard.js");
const createShip = require("../src/ship/ship.js");

describe("Player", () => {
  let gameBoard = createGameBoard();
  let ship;
  let player1;
  beforeEach(() => {
    player1 = createPlayer("joska", "human", gameBoard);
    ship = createShip(3);
  });
  it("name must be given", () => {
    expect(() => {
      createPlayer("", "human", gameBoard);
    }).toThrow("please input a name");
  });
  it("can't make invalid moves", () => {
    expect(() => {
      player1.placeShip(ship, 9, 8, "horizontal");
    }).toThrow("out of bounds");
  });
});
