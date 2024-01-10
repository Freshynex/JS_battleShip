const createShip = function (length) {
  if (isNaN(length) || Number(length) <= 0) throw new Error("Invalid length");
  const shipLength = length;
  const getShipLength = () => {
    return length;
  };
  let hp = length;
  let isSunk = false;

  const takeDamage = () => {
    if (hp === 0) return;
    hp -= 1;
    if (hp === 0) isSunk = true;
  };

  const getHp = () => {
    return hp;
  };

  const getSunkStatus = () => {
    return isSunk;
  };

  return { takeDamage, getHp, getSunkStatus, getShipLength };
};

module.exports = createShip;
