const createGame = function() {
  let playerOne;
  let playerTwo;
  
  const getPlayers = () => { return [ playerOne, playerTwo ]}

  const hasLost = (player) => { 
    const ships = player.getShips();
    if(ships){
      return ships.every((e) => e.getSunkStatus());
    }
  }

  const initialize = (player1, player2) => {
    playerOne = player1;
    playerTwo = player2;
  }

  return { getPlayers, hasLost, initialize }
} 

module.exports = createGame;