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
        length += 1;
        container.appendChild(tileDiv);
      });
    });
    console.log(length);
  };

  const findTileNode = (x, y) => {
    // let selector = "#" + y + x;
    const tile = document.getElementById(`${x}${y}`);
    return tile;
  };

  const updateTile = (newValue, y, x) => {
    let tile = findTileNode(x, y);
    tile.className = `tile ${newValue}`;
    tile.textContent = newValue
  };

  return { displayGameBoard, updateTile };
})();

module.exports = domController;
