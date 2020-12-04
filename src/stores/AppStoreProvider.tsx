/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';

import Board from 'models/Board';

import ScreensConfig from 'ScreensConfig';
import Cell from 'models/Cell';
import cloneMultiDimArray from 'utils/cloneMultiDimArray';
import BoardUtils from './utils/BoardUtils';
import Settings from 'utils/Settings';

export const STORAGE_KEYS = {
  BASE: 'MS_',
  BOMBS: 'BOMBS',
  ROWS: 'ROWS',
  COLUMNS: 'COLUMNS',
  GAME: 'GAME',
  BOARD: 'BOARD'
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

export enum ResultValues {
  None,
  Loser,
  Winner
}

export const AppStoreContext = React.createContext({
  screen: null,
  rows: 0,
  columns: 0,
  bombs: 0,
  board: [],
  flags: 0,
  game: [],
  hasResult: false,
  result: ResultValues.None,
  isGameActive: false,
  startGame: null,
  play: null,
  flag: null,
  playAgain: null,
  reset: null
});

interface IProps {
  children: JSX.Element;
}

// exporting unwrapped component for testing purposes.
export default ({ children }: IProps): JSX.Element => {
  const [isInitialized, setInitialized] = useState(false);
  const [isGameActive, setGameActive] = useState(false);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [flags, setFlags] = useState(0);
  const [screen, setScreen] = useState(ScreensConfig.intro.id);
  const [game, setGame] = useState([]);
  const [board, setBoard] = useState([]);
  const [result, setResult] = useState(ResultValues.None);
  const [hasResult, setHasResult] = useState(false);

  //********************
  // Inner
  // *******************

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

    // if the cell is out of bounds return current queue
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
    setHasResult(true);
    setResult(ResultValues.Loser);
    gotoEnd();
    clearSavedGame();
  };

  const win = () => {
    setHasResult(true);
    setResult(ResultValues.Winner);
    gotoEnd();
    clearSavedGame();
  };

  const clearSavedGame = () => {
    Settings.setSetting(STORAGE_KEYS.BOARD);
    Settings.setSetting(STORAGE_KEYS.GAME);
  };

  const gotoEnd = () => {
    setTimeout(() => {
      setScreen(ScreensConfig.end.id);
    }, 2000);
  };

  const playComplete = (updatedGame: Board): void => {
    /*
    TODO: We could keep track of the number of plays within the play execution algorithm and the state
    to alleviate this extra operation.
     */
    console.time('victory resolution');

    const playsCount: number = updatedGame
      .flat()
      .filter((value: number) => value === GameValues.Played).length;

    console.timeEnd('victory resolution');

    setGame(updatedGame);
    if (playsCount === ((rows * columns) - bombs)) {
      win();
    }

    // save the game state
    setTimeout(() => {
      Settings.setSetting(STORAGE_KEYS.GAME, JSON.stringify(updatedGame));
    }, 0);
  };

  //********************
  // API
  // *******************

  const play = (cell: Cell): void => {
    let brd: Board;

    console.time('game cloning');
    let gameClone = cloneMultiDimArray(game);
    console.timeEnd('game cloning');

    if (!isGameActive) {
      setGameActive(true);
      brd = BoardUtils.buildBoard(rows, columns, bombs, GameValues.Empty, cell);
      setBoard(brd);
      gameClone = updateBoardCell(gameClone, cell, GameValues.Played);

      // save the board
      setTimeout(() => {
        Settings.setSetting(STORAGE_KEYS.BOARD, JSON.stringify(brd));
      }, 0);
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
    if (flags === bombs) return;

    let gameClone: Board = cloneMultiDimArray(game);

    if (gameClone[cell[0]][cell[1]] === GameValues.Empty) {
      const f = flags + 1;
      setFlags(f);
      gameClone = updateBoardCell(gameClone, cell, GameValues.Flag);
    } else {
      const f = flags - 1;
      gameClone = updateBoardCell(gameClone, cell, GameValues.Empty);
    }

    setGame(gameClone);
  };

  const startGame = (rowVal: number, columnVal: number, bombVal: number) => {
    // TODO: need a way to disallow too many bombs
    setRows(rowVal);
    setColumns(columnVal);
    setBombs(bombVal);
    setScreen(ScreensConfig.game.id);
    setGame(BoardUtils.buildEmptyMatrix(rowVal, columnVal, BoardValues.Empty));
    Settings.setSetting(STORAGE_KEYS.ROWS, rowVal.toString(10));
    Settings.setSetting(STORAGE_KEYS.COLUMNS, columnVal.toString(10));
    Settings.setSetting(STORAGE_KEYS.BOMBS, bombVal.toString(10));
    return true;
  };

  const playAgain = () => {
    setHasResult(false);
    setGameActive(false);
    setResult(ResultValues.None);
    startGame(rows, columns, bombs);
  };

  const reset = () => {
    setHasResult(false);
    setGameActive(false);
    setResult(ResultValues.None);
    setInitialized(false);
    setScreen(ScreensConfig.intro.id);
  };

  //********************
  // Init
  // *******************
  useEffect(() => {
    if (!isInitialized) {
      const rows: number = parseInt(
        Settings.getSetting(STORAGE_KEYS.ROWS, DEFAULTS.ROWS) as string,
        10
      );
      const columns: number = parseInt(
        Settings.getSetting(STORAGE_KEYS.COLUMNS, DEFAULTS.COLUMNS) as string,
        10
      );
      const bombs: number = parseInt(
        Settings.getSetting(STORAGE_KEYS.BOMBS, DEFAULTS.COLUMNS) as string,
        10
      );

      setRows(rows);
      setColumns(columns);
      setBombs(bombs);
      const savedGameJson = Settings.getSetting(STORAGE_KEYS.GAME);
      const hasSaveGame: boolean = typeof savedGameJson === 'string';
      if (hasSaveGame) {
        const savedBoardJson: string = Settings.getSetting(STORAGE_KEYS.BOARD);
        const savedBoard: Board = JSON.parse(savedBoardJson);
        const savedGame: Board = JSON.parse(savedGameJson);
        setGame(savedGame);
        setBoard(savedBoard);
        setScreen(ScreensConfig.game.id);
        setGameActive(true);
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
      hasResult,
      result,
      playAgain,
      startGame,
      reset,
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
