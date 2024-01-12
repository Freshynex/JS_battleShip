const createGame = require("../src/game/game.js");
const createGameBoard = require('../src/gameboard/gameboard.js');
const createShip = require('../src/ship/ship.js');
const createPlayer = require("../src/player/player.js");

describe("Game", () => {
  let game;
  const player = createPlayer("joska", "human", createGameBoard());

  beforeEach(() => {
    game = createGame(player, "player2");
  })
  it("player lost if all ships have sunk", () => {
    // Arrange
    player.addShip(createShip(1));
    player.addShip(createShip(2));

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
    player.addShip(createShip(1));
    player.addShip(createShip(2));

    player.getShips()[0].takeDamage();
    player.getShips()[1].takeDamage();

    expect(game.hasLost(player)).toBe(false);
  })
  it("initializes with 2 players", () => {
    const player1 = createPlayer("joska", "human", createGameBoard());
    const player2 = createPlayer("pista", "human", createGameBoard());
    game.initialize(player1, player2);

    expect(game.getPlayers()).toEqual([player1, player2]);
  })
})