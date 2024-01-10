const createGame = require("../src/game/game.js");
const createGameBoard = require('../src/gameboard/gameboard.js');
const createShip = require('../src/ship/ship.js');
const createPlayer = require("../src/player/player.js");

describe("Game", () => {

  it("player lost if all ships have sunk", () => {
    // Arrange
    const player = createPlayer("joska", "human", createGameBoard());
    player.addShip(createShip(1));
    player.addShip(createShip(2));
    
    const game = createGame(player, "player2");

    // Act
    // Inflict damage to ships
    player.getShips()[0].takeDamage();
    player.getShips()[1].takeDamage();
    player.getShips()[1].takeDamage();

    // Assert
    // Check if the game correctly determines if the player has lost
    expect(game.hasLost(player)).toBe(true);
  })
  it("player not lost if one or more ships are intact", () => {
    const player = createPlayer("joska", "human", createGameBoard());
    player.addShip(createShip(1));
    player.addShip(createShip(2));

    const game = createGame(player, "player2");

    player.getShips()[0].takeDamage();
    player.getShips()[1].takeDamage();

    expect(game.hasLost(player)).toBe(false);
  })
})