import React, {
  MouseEventHandler,
  useLayoutEffect,
  useEffect,
  useRef
} from 'react';
import { css } from '@emotion/core';

import Board from 'models/Board';
import Cell from 'models/Cell';
import GameButton from './components/GameButton';
import theme from 'styles/theme';
import { GameValues } from '../../stores/AppStoreProvider';

export const getCellFromEventTarget = (target: any): Cell => {
  const row: number = parseInt(target.getAttribute('data-row'), 10);
  const col: number = parseInt(target.getAttribute('data-column'), 10);
  return [row, col];
};

export interface IGameScreenProps {
  board: Board;
  game: Board;
  flags: Board;
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
  `
};

export default ({
  board,
  game,
  flags,
  play,
  flag,
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
      gameBoardEl.current.removeEventListener('contextmenu', onRightClick);
    };
  });
  const getContainerStyle = (): any => {
    const style: any = {
      width: `${game[0].length}rem`,
      height: `${game.length}rem`
    };
    return style;
  };

  const renderTiles = (): JSX.Element[][] => {
    return game.map((row, rowIndex: number) => {
      return row.map((gameValue, columnIndex: number) => {
        const boardValue: number = isGameActive
          ? board[rowIndex][columnIndex]
          : 0;

        console.log('isGameActive', isGameActive);

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
          />
        );
      });
    });
  };

  const renderBoard = () => {
    console.log(game);
    const jsx = (
      <div
        onClick={onClick}
        ref={gameBoardEl}
        css={styles.board}
        style={getContainerStyle()}
      >
        {renderTiles()}
      </div>
    );
    return jsx;
  };

  return renderBoard();
};
