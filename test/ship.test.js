const createShip = require("../src/ship/ship.js");

describe("Ship object", () => {
  it("only accepts positive numbers > 0 as length", () => {
    expect(() => {
      createShip(0);
    }).toThrow();
    expect(() => {
      createShip(-1);
    }).toThrow();
    expect(() => {
      createShip("asd");
    }).toThrow();
  });

  it("can lose health", () => {
    let ship = createShip(2);
    // full health
    expect(ship.getHp()).toEqual(2);
    // 1 damage
    ship.takeDamage();
    expect(ship.getHp()).toEqual(1);
  });

  it("doesnt sink when hp is above 0", () => {
    let ship = createShip(2);
    ship.takeDamage();
    expect(ship.getSunkStatus()).toBe(false);
  });

  it("sinks when hp reaches 0", () => {
    let ship = createShip(2);
    ship.takeDamage();
    ship.takeDamage();
    expect(ship.getSunkStatus()).toBe(true);
  });

  it("health does not go below 0", () => {
    let ship = createShip(1);
    ship.takeDamage();
    ship.takeDamage();
    expect(ship.getHp()).toEqual(0);
  });
});
