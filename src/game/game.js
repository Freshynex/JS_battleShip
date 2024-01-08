const createGame = function(player1, player2) {
  const playerOne = player1;
  const playerTwo = player2;

  const getPlayers = () => { return [ playerOne, playerTwo ]}

  const hasLost = (player) => { 
    const ships = player.getShips();
    if(ships){
      return ships.every((e) => e.getSunkStatus());
    }
  }

  return { getPlayers, hasLost }
} 

module.exports = createGame;