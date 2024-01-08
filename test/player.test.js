const createPlayer = require("../src/player/player.js");
const createGameBoard = require("../src/gameboard/gameboard.js");
const createShip = require("../src/ship/ship.js");

describe("Player", () => {
  let gameBoard;

  beforeEach(() => {
      gameBoard = createGameBoard();
  })

  it("cannot place ship out of bounds", () => {
    const player = createPlayer("jozsi", "human", gameBoard);

    player.placeShip(createShip(3), 9, 9, "horizontal");

    expect(gameBoard.findCoordinates(9, 9).type).toBe("empty");
  })
  it("cannot place ship on top of other ship", () => {
    const player = createPlayer("jozsi", "human", gameBoard);
    
    player.placeShip(createShip(3), 2, 2, "vertical");
    player.placeShip(createShip(3), 1, 2, "horizontal");

    expect(gameBoard.findCoordinates(1, 1).type).toEqual("empty");
  })
})