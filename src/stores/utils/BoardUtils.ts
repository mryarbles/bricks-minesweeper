import Board from 'models/Board';
import Cell from 'models/Cell';
import { BoardValues } from '../AppStoreProvider';

export const getRandomCell = (cr: number, cc: number): Cell => {
  const randR: number = Math.round(Math.random() * (cr - 1));
  const randC: number = Math.round(Math.random() * (cc - 1));
  return [randR, randC];
};

export const modifyBoardCell = (arr: Board, cell: Cell, value: number): Board => {
  arr[cell[0]][cell[1]] = value;
  return arr;
};

export const incBoardCell = (
  arr: Board,
  startCell: Cell,
  offsetX: number,
  offsetY: number
): Board => {
  const targRow: number = startCell[0] + offsetY;
  const targCol: number = startCell[1] + offsetX;
  if (
    typeof arr[targRow] !== 'undefined' &&
    typeof arr[targRow][targCol] !== 'undefined'
  ) {
    const oldValue = arr[targRow][targCol];
    const newValue =
      oldValue < BoardValues.Bomb ? oldValue + 1 : BoardValues.Bomb;
    return modifyBoardCell(arr, [targRow, targCol], newValue);
  }
  return arr;
};

export const incAroundBomb = (arr: Board, bombCell: Cell) => {
  let b: Board = incBoardCell(arr, bombCell, -1, -1);
  b = incBoardCell(arr, bombCell, -1, 0);
  b = incBoardCell(arr, bombCell, -1, 1);
  b = incBoardCell(arr, bombCell, 0, -1);
  b = incBoardCell(arr, bombCell, 0, 1);
  b = incBoardCell(arr, bombCell, 1, -1);
  b = incBoardCell(arr, bombCell, 1, 0);
  b = incBoardCell(arr, bombCell, 1, 1);
  return b;
};



export const buildEmptyMatrix = (r: number, c: number, value: number): Board => {
  const mat: Board = [];
  let rowCount: number = 0;
  while (rowCount < r) {
    const rarr = new Array(c).fill(value);
    mat.push(rarr);
    rowCount += 1;
  }
  return mat;
};

export const buildBoard = (
  r: number,
  c: number,
  b: number,
  fillValue: number,
  initialPlay: [number, number]
): Board => {
  const board: Board = buildEmptyMatrix(r, c, fillValue);
  while (b > 0) {
    const bombCell: [number, number] = getRandomCell(r, c);
    if (
      (bombCell[0] !== initialPlay[0] && bombCell[1] !== initialPlay[1])
      && (board[bombCell[0]][bombCell[1]] !== BoardValues.Bomb))
    {
      board[bombCell[0]][bombCell[1]] = BoardValues.Bomb;
      incAroundBomb(board, bombCell);
      b -= 1;
    }
  }
  return board;
};

export default {
  modifyBoardCell,
  incBoardCell,
  incAroundBomb,
  buildBoard,
  buildEmptyMatrix
}
