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

function Board({ nrows = 8, ncols = 8, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  console.log("board at line 33", board);
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < ncols; y++) {
      let row = [];
      for (let x = 0; x < nrows; x++) {
        row.push(randomTF());
      }
      initialBoard.push(row);
    }
    console.log("initial", initialBoard);
    return initialBoard;
  }

  function hasWon() {
    for (let row of board) {
      if (row.includes(true)) {
        return false;
      }
      return true;
    }
  }

  //coord = 'y-x'
  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
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

  function createPhysicalBoard() {
    let tableBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(
          <Cell
            flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
            isLit={board[y][x]}
          />
        );
      }
      tableBoard.push(<tr>{row}</tr>);
    }
    console.log("tableBoard", tableBoard);
    return tableBoard;
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
  // console.log(createPhysicalBoard());
  console.log("board ---", board);

  return (
    <table>
      <tbody>{createPhysicalBoard()}</tbody>
    </table>
  );
}

export default Board;
