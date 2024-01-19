const domController = (function () {
  const playerOneBoardContainer = document.querySelector("#playerOneBoard");
  const playerTwoBoardContainer = document.querySelector("#playerTwoBoard");
  const errorField = document.getElementById("error");

  const displayGameBoard = (gameBoard, player, tileClickedFunction) => {
    let container =
      player === 1 ? playerOneBoardContainer : playerTwoBoardContainer;
    const tiles = gameBoard.getCoordinates();
    console.log(tiles);
    let length = 0;

    tiles.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        let tileDiv = document.createElement("div");
        tileDiv.classList.add("tile", "empty");
        tileDiv.id = `p${player}-${colIndex}${rowIndex}`;
        tileDiv.dataset.coordinates = `${rowIndex}-${colIndex}`;
        tileDiv.addEventListener("click", tileClickedFunction);
        // y          // x
        tileDiv.textContent = col.type;
        // `${colIndex} - ${rowIndex}`;
        length += 1;
        container.appendChild(tileDiv);
      });
    });
    console.log(length);
  };

  const displayError = (e) => {
    errorField.textContent = e;
  };

  const findTileNode = (p, x, y) => {
    // let selector = "#" + y + x;
    const tile = document.getElementById(`p${p}-${x}${y}`);
    return tile;
  };

  const clearErrors = () => {
    errorField.textContent = "";
  };

  const updateTile = (p, newValue, x, y) => {
    let tile = findTileNode(p, x, y);
    console.log(tile);
    tile.className = `tile ${newValue}`;
    tile.textContent = newValue;
  };

  return { displayGameBoard, updateTile, displayError, clearErrors };
})();

module.exports = domController;
