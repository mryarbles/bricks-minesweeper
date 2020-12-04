import React, {
  MouseEventHandler,
  useLayoutEffect,
  useEffect,
  useRef
} from 'react';
import { css } from '@emotion/core';

import { FaSmile, FaSkull } from 'react-icons/fa';

import Board from 'models/Board';
import Cell from 'models/Cell';
import GameButton from './components/GameButton';
import theme from 'styles/theme';
import { GameValues, ResultValues } from '../../stores/AppStoreProvider';

export const getCellFromEventTarget = (target: any): Cell => {
  const row: number = parseInt(target.getAttribute('data-row'), 10);
  const col: number = parseInt(target.getAttribute('data-column'), 10);
  return [row, col];
};

export interface IGameScreenProps {
  board: Board;
  game: Board;
  result: number;
  hasResult: boolean;
  isGameActive: boolean;
  play: (cell: Cell) => void;
  flag: (cell: Cell) => void;
}

const styles = {
  board: css`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    align-content: center;
    ${theme.mixins.centeredDiv}
  `,
  result: css`
    width: 25vw;
    height: 25vh;
    font-size: 12rem;
    color: red;
    text-shadow: 12px 12px black;
    margin-top: -60px; // TODO: figure out why this is necessary.
    ${theme.mixins.centeredDiv}
  `,
  modalOverlay: css`
    background: rgba(255, 255, 255, 0.5);
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  `,
  winner: css`
    color: blue;
  `,
  loser: css`
    color: red;
  `
};

export default ({
  board,
  game,
  play,
  flag,
  result,
  hasResult,
  isGameActive
}: IGameScreenProps): JSX.Element => {
  const gameBoardEl = useRef(null);

  const onClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const cell = getCellFromEventTarget(event.target);
    play(cell);
  };

  const onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const cell = getCellFromEventTarget(event.target);
    flag(cell);
  };

  useEffect(() => {
    gameBoardEl.current.addEventListener('contextmenu', onRightClick);
    return () => {
      if (gameBoardEl && gameBoardEl.current)
        gameBoardEl.current.removeEventListener('contextmenu', onRightClick);
    };
  });

  const getContainerStyle = (): any => {
    const style: any = {
      width: `${game[0].length * 2}rem`,
      height: `${game.length * 2}rem`
    };
    return style;
  };

  const renderTiles = (): JSX.Element[][] => {
    return game.map((row, rowIndex: number) => {
      return row.map((gameValue, columnIndex: number) => {
        const boardValue: number = isGameActive
          ? board[rowIndex][columnIndex]
          : 0;

        const id: string = `btn-${rowIndex}-${columnIndex}`;

        return (
          <GameButton
            id={id}
            row={rowIndex}
            column={columnIndex}
            key={id}
            isSelected={gameValue === GameValues.Played}
            boardValue={boardValue}
            isFlagged={gameValue === GameValues.Flag}
            hasResult={hasResult}
            result={result}
          />
        );
      });
    });
  };

  const renderResult = () => {
    const icon = result === ResultValues.Winner ? <FaSmile /> : <FaSkull />;
    const iconStyle =
      result === ResultValues.Winner ? styles.winner : styles.loser;

    if (hasResult) {
      return (
        <div css={styles.modalOverlay}>
          <div css={[styles.result, iconStyle]}>{icon}</div>
        </div>
      );
    }
    return null;
  };

  const renderBoard = () => {
    return (
      <div
        onClick={onClick}
        ref={gameBoardEl}
        css={styles.board}
        style={getContainerStyle()}
      >
        {renderTiles()}
      </div>
    );
  };

  return (
    <>
      {renderResult()}
      {renderBoard()}
    </>
  );
};
