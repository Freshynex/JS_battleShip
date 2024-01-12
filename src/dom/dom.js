const domController = (function () {
  const playerOneBoardContainer = document.querySelector("#playerOneBoard");
  const playerTwoBoardContainer = document.querySelector("#playerTwoBoard");

  const displayGameBoard = (gameBoard) => {
    let container = playerOneBoardContainer;
    const tiles = gameBoard.getCoordinates();
    console.log(tiles);
    let length = 0;
    tiles.forEach((row, rowindex) => {
      row.forEach((col, colindex) => {
        let tileDiv = document.createElement("div");
        tileDiv.textContent = col.type;
        container.appendChild(tileDiv);
        length += 1;
      });
    });
    console.log(length);
  };

  return { displayGameBoard };
})();

module.exports = domController;
