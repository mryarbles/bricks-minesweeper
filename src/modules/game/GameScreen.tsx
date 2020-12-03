import React, {
  MouseEventHandler,
  useLayoutEffect,
  useEffect,
  useRef
} from 'react';
import { css } from '@emotion/core';

import Board from 'models/Board';
import GameButton from './components/GameButton';
import theme from 'styles/theme';

export interface IGameScreenProps {
  board: Board;
  game: Board;
  flags: Board;
  isGameActive: boolean;
  play: (row: number, column: number) => void;
  flag: (row: number, column: number) => void;
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
    debugger;
  };
  const onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    console.log('right click', event.target);
  };

  useEffect(() => {
    gameBoardEl.current.addEventListener('contextmenu', onRightClick);
    return () => {
      gameBoardEl.current.removeEventListener('contextmenu');
    };
  });
  const getContainerStyle = () => {
    const style = {
      width: `${game[0].length}rem`,
      height: `${game.length}rem`
    };
    return style;
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
        {game.map((row, rowIndex: number) => {
          return row.map((gameValue, columnIndex: number) => {
            console.log(rowIndex, columnIndex);
            const boardValue: number = isGameActive
              ? board[rowIndex][columnIndex]
              : 0;
            const flagValue: boolean = isGameActive
              ? Boolean(flags[rowIndex][columnIndex])
              : false;
            const id: string = `btn-${rowIndex}-${columnIndex}`;
            return (
              <GameButton
                id={id}
                row={rowIndex}
                column={columnIndex}
                key={id}
                isSelected={Boolean(gameValue)}
                boardValue={boardValue}
                isFlagged={Boolean(flagValue)}
              />
            );
          });
        })}
      </div>
    );
    return jsx;
  };

  return renderBoard();
};
