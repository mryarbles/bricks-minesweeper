/* eslint-disable react-hooks/exhaustive-deps */

import React, { ReactNode, useState, useEffect } from 'react';

import Board from '../models/Board';

import Screens from '../constants/Screens';
import Cell from '../models/Cell';

export const AppStoreContext = React.createContext({
  screen: null,
  rows: 0,
  columns: 0,
  bombs: 0,
  board: [],
  flags: [],
  game: [],
  isGameActive: false,
  startGame: null,
  play: null,
  flag: null
});

interface IProps {
  children: JSX.Element;
}

const STORAGE_KEYS = {
  BASE: 'MS_',
  BOMBS: 'BOMBS',
  ROWS: 'ROWS',
  COLUMNS: 'COLUMNS'
};

const DEFAULTS: Record<string, string | number> = {
  ROWS: 15,
  COLUMNS: 10
};

export enum BoardValues {
  Bomb = 9,
  Empty = 0
}

export enum GameValues {
  Flag = 2,
  Empty = 0,
  Played = 1
}

const modifyBoardCell = (arr: Board, cell: Cell, value: number): Board => {
  arr[cell[0]][cell[1]] = value;
  return arr;
};

const incBoardCell = (
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

const incAroundBomb = (arr: Board, bombCell: Cell) => {
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

const getSetting = (
  key: string,
  defaultValue: string | number
): number | string => {
  let value = null;
  if (window && window.localStorage) {
    value = window.localStorage.getItem(`${STORAGE_KEYS.BASE}${key}`);
  }
  return value || defaultValue;
};

const setSetting = (key: string, value: number | string): void => {
  if (window && window.localStorage) {
    window.localStorage.setItem(`${STORAGE_KEYS.BASE}${key}`, value as string);
  }
};

export const cloneMultiDimArray = (arr: any[][]): any[][] => {
  return arr.map((subArr: any[]) => subArr.slice());
};

export const getRandomCell = (cr: number, cc: number): Cell => {
  const randR: number = Math.round(Math.random() * (cr - 1));
  const randC: number = Math.round(Math.random() * (cc - 1));
  return [randR, randC];
};

export const buildEmptyMatrix = (r: number, c: number): Board => {
  const mat: Board = [];
  let rowCount: number = 0;
  while (rowCount < r) {
    const rarr = new Array(c).fill(BoardValues.Empty);
    mat.push(rarr);
    rowCount += 1;
  }
  return mat;
};

export const buildBoard = (
  r: number,
  c: number,
  b: number,
  initialPlay: [number, number]
): Board => {
  const board: Board = buildEmptyMatrix(r, c);
  while (b > 0) {
    const bombCell: [number, number] = getRandomCell(r, c);
    if (bombCell[0] !== initialPlay[0] && bombCell[1] !== initialPlay[1]) {
      board[bombCell[0]][bombCell[1]] = BoardValues.Bomb;
      incAroundBomb(board, bombCell);
      b -= 1;
    }
  }
  return board;
};

// exporting unwrapped component for testing purposes.
export default ({ children }: IProps): JSX.Element => {
  const startGame = (rowVal: number, columnVal: number, bombVal: number) => {
    // TODO: need a way to disallow too many bombs
    setRows(rowVal);
    setColumns(columnVal);
    setBombs(bombVal);
    setScreen(Screens.game.id);
    setGame(buildEmptyMatrix(rowVal, columnVal));

    setSetting(STORAGE_KEYS.ROWS, rowVal.toString(10));
    setSetting(STORAGE_KEYS.COLUMNS, columnVal.toString(10));
    setSetting(STORAGE_KEYS.BOMBS, bombVal.toString(10));
    return true;
  };

  const updateBoardCell = (game: Board, cell: Cell, value: number): Board => {
    game[cell[0]][cell[1]] = value;
    return game;
  };

  const getLinkedCell = (
    queue: Cell[],
    board: Board,
    game: Board,
    cell: Cell,
    offsetX: number,
    offsetY: number
  ): Cell[] => {
    const targRow: number = cell[0] + offsetY;
    const targCol: number = cell[1] + offsetX;

    if (
      typeof board[targRow] === 'undefined' ||
      typeof board[targRow][targCol] === 'undefined'
    )
      return queue;

    const boardValue: number = board[targRow][targCol];
    const gameValue: number = game[targRow] && game[targRow][targCol];

    // if the board cell has a value and it has not been played then update the game, and don't add the cell to queue
    if (
      boardValue > BoardValues.Empty &&
      boardValue < BoardValues.Bomb &&
      gameValue === GameValues.Empty
    ) {
      // update the game state and don't add the cell to the queue for processing because it's number
      game[targRow][targCol] = GameValues.Played;
    } else if (
      boardValue === BoardValues.Empty &&
      gameValue === GameValues.Empty
    ) {
      // we don't need to update game value here because it will be updated when cell is processed.
      queue.push([targRow, targCol]);
    }

    return queue;
  };

  const processCell = (board: Board, game: Board, cell: Cell): Cell[] => {
    let queue: Cell[] = [];

    queue = getLinkedCell(queue, board, game, cell, -1, -1);
    queue = getLinkedCell(queue, board, game, cell, 0, -1);
    queue = getLinkedCell(queue, board, game, cell, 1, -1);
    queue = getLinkedCell(queue, board, game, cell, -1, 0);
    queue = getLinkedCell(queue, board, game, cell, 1, 0);
    queue = getLinkedCell(queue, board, game, cell, -1, 1);
    queue = getLinkedCell(queue, board, game, cell, 0, 1);
    queue = getLinkedCell(queue, board, game, cell, 1, 1);

    // update the game cell as played
    game[cell[0]][cell[1]] = GameValues.Played;

    return queue;
  };

  const processPlay = (
    board: Board,
    game: Board,
    cellQueue: Cell[],
    callback: (gameBoard: Board) => void
  ): void => {
    if (cellQueue.length === 0) {
      callback(game);
    } else {
      let queue: Cell[] = [];
      cellQueue.forEach((cell: Cell) => {
        const result: Cell[] = processCell(board, game, cell);
        queue = queue.concat(result);
      });
      processPlay(board, game, queue, callback);
    }
  };

  const lose = () => {
    /* eslint-disable-next-line */
    console.log('AppStoreProvider.lose  ');
  };

  const playComplete = (updatedGame: Board): void => {
    setGame(updatedGame);
  };

  const play = (cell: Cell): void => {
    let brd: Board;
    let gameClone = cloneMultiDimArray(game);

    if (!isGameActive) {
      setGameActive(true);
      brd = buildBoard(rows, columns, bombs, cell);
      setBoard(brd);
      // add
      gameClone = updateBoardCell(gameClone, cell, GameValues.Played);
    } else {
      brd = board;
    }

    if (brd[cell[0]][cell[1]] === BoardValues.Bomb) {
      lose();
    } else {
      processPlay(brd, gameClone, [cell], playComplete);
    }
  };

  const flag = (cell: Cell): void => {
    let gameClone: Board = cloneMultiDimArray(game);

    if (gameClone[cell[0]][cell[1]] === GameValues.Empty) {
      gameClone = updateBoardCell(gameClone, cell, GameValues.Flag);
    } else {
      gameClone = updateBoardCell(gameClone, cell, GameValues.Empty);
    }

    setGame(gameClone);
  };

  const [isInitialized, setInitialized] = useState(false);
  const [isGameActive, setGameActive] = useState(false);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [screen, setScreen] = useState(Screens.intro.id);
  const [game, setGame] = useState([]);
  const [board, setBoard] = useState([]);

  // initialize app.
  useEffect(() => {
    if (!isInitialized) {
      const rows: number = parseInt(
        getSetting(STORAGE_KEYS.ROWS, DEFAULTS.ROWS) as string,
        10
      );
      const columns: number = parseInt(
        getSetting(STORAGE_KEYS.COLUMNS, DEFAULTS.COLUMNS) as string,
        10
      );
      const bombs: number = parseInt(
        getSetting(STORAGE_KEYS.BOMBS, DEFAULTS.COLUMNS) as string,
        10
      );
      setRows(rows);
      setColumns(columns);
      setBombs(bombs);
      const savedGame: string = getSetting('SAVE', '') as string;
      const hasSaveGame: boolean = savedGame.length > 0;
      if (hasSaveGame) {
        setScreen(Screens.game.id);
      }
      setInitialized(true);
    }
  }, [
    isInitialized,
    setInitialized,
    rows,
    columns,
    setRows,
    setColumns,
    setScreen
  ]);

  if (isInitialized) {
    const storeValue: any = {
      rows,
      columns,
      screen,
      bombs,
      game,
      board,
      isGameActive,
      startGame,
      play,
      flag
    };

    return (
      <AppStoreContext.Provider value={storeValue}>
        {children}
      </AppStoreContext.Provider>
    );
  }

  return null;
};
