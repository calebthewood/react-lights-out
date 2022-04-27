import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import randomTF from "./helpers";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(rows, cols) {

    let initialBoard = [];
    for (let y = 0; y < cols; y++) {
      let row = [];
      for (let x = 0; x < rows; x++) {
        row.push(randomTF());
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    //all f === win.
    for (let row of board) {
      if (row.includes(true)) {
        return false;
      }
      return true;
    }

    //coord = 'y-x'
    function flipCellsAround(coord) {
      setBoard(oldBoard => {
        const [y, x] = coord.split("-").map(Number);

        const flipCell = (y, x, boardCopy) => {
          // if this coord is actually on board, flip it

          if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
            boardCopy[y][x] = !boardCopy[y][x];
          }
        };

        // TODO: Make a (deep) copy of the oldBoard
        const boardCopy = [...board];
        // TODO: in the copy, flip this cell and the cells around it

        // TODO: return the copy
      });
    }

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    return (
      <div>
        {hasWon() ? <h2>You Win!</h2>
          :
          board.map((row, y) =>
            row.map((onOff, x) =>
              <Cell
                flipCellsAroundMe={flipCellsAround(`${y}-${x}`)}
                isLit={onOff}
              />))};
      </div>
    );
  }
}

export default Board;
