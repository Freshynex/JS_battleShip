const domController = (function () {
  const playerOneBoardContainer = document.querySelector("#playerOneBoard");
  const playerTwoBoardContainer = document.querySelector("#playerTwoBoard");

  const displayGameBoard = (gameBoard, player) => {
    let container =
      player === 1 ? playerOneBoardContainer : playerTwoBoardContainer;
    const tiles = gameBoard.getCoordinates();
    console.log(tiles);
    let length = 0;

    tiles.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        let tileDiv = document.createElement("div");
        tileDiv.classList.add("tile", "empty");
        tileDiv.id = `${colIndex}${rowIndex}`;
        // y          // x
        tileDiv.textContent = col.type;
        // `${colIndex} - ${rowIndex}`;
        container.appendChild(tileDiv);
        length += 1;
      });
    });
    console.log(length);
  };

  const findTile = (gameBoard, y, x) => {
    // let selector = "#" + y + x;
    const tile = document.getElementById("00");
    return tile;
  };

  const updateTile = (gameBoard, y, x) => {
    let tileData = gameBoard.findCoordinates(y, x);
    let tileDomElement = findTile(gameBoard, y, x);
    tileDomElement.className = `tile ${tileData.type}`;
  };

  return { displayGameBoard, updateTile };
})();

module.exports = domController;
