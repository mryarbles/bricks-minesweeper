/* eslint-disable react-hooks/exhaustive-deps */

import React, { ReactNode, useState, useEffect } from 'react';

import Board from '../models/Board';

import Screens from '../constants/Screens';

export const AppStoreContext = React.createContext({
  screen: null,
  rows: 0,
  columns: 0,
  bombs: 0,
  board: [],
  flags: [],
  game: [],
  startGame: null,
  play: null,
  flag: null
});

interface IProps {
  children: JSX.Element;
}

const STORAGE_KEY_BASE: string = 'MS_';

const DEFAULTS: Record<string, string | number> = {
  ROWS: 15,
  COLUMNS: 10
};

export enum CellValues {
  Bomb = 9,
  Flag = 1,
  Empty = 0
}

const getSetting = (
  key: string,
  defaultValue: string | number
): number | string => {
  let value = null;
  if (window && window.localStorage) {
    value = window.localStorage.getItem(`${STORAGE_KEY_BASE}${key}`);
  }
  return value || defaultValue;
};

const setSetting = (key: string, value: number | string): void => {
  if (window && window.localStorage) {
    window.localStorage.setItem(`${STORAGE_KEY_BASE}${key}`, value as string);
  }
};

export const getRandomCell = (cr: number, cc: number): [number, number] => {
  const randR: number = Math.round(Math.random() * (cr - 1));
  const randC: number = Math.round(Math.random() * (cc - 1));
  return [randR, randC];
};

export const buildEmptyMatrix = (r: number, c: number): Board => {
  const mat: Board = [];
  let rowCount: number = 0;
  while (rowCount < r) {
    const rarr = new Array(c).fill(CellValues.Empty);
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
      board[bombCell[0]][bombCell[1]] = CellValues.Bomb;
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

    setSetting('ROWS', rowVal.toString(10));
    setSetting('COLUMNS', columnVal.toString(10));
    setSetting('BOMBS', bombVal.toString(10));
    return true;
  };

  const play = (row: number, column: number): void => {
    if (!isGameActive) {
      setGameActive(true);
      const newBoard = buildBoard(rows, columns, bombs, [row, column]);
      setBoard(newBoard);
    }
  };

  const flag = (row: number, column: number): void => {};

  const [isInitialized, setInitialized] = useState(false);
  const [isGameActive, setGameActive] = useState(false);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [screen, setScreen] = useState(Screens.intro.id);
  const [game, setGame] = useState([]);
  const [board, setBoard] = useState([]);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    if (!isInitialized) {
      const rows: number = parseInt(
        getSetting('ROWS', DEFAULTS.ROWS) as string,
        10
      );
      const columns: number = parseInt(
        getSetting('COLUMNS', DEFAULTS.COLUMNS) as string,
        10
      );
      const bombs: number = parseInt(
        getSetting('BOMBS', DEFAULTS.COLUMNS) as string,
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
      flags,
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
