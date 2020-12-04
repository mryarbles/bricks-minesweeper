import React, { ReactHTMLElement } from 'react';
import { css } from '@emotion/core';
import theme from 'styles/theme';

import { BoardValues } from 'stores/AppStoreProvider';

interface IProps {
  id: string;
  row: number;
  column: number;
  isSelected: boolean;
  isFlagged: boolean;
  boardValue: number;
}

const styles = {
  btn: css`
    font-size: 0.5rem;
    background: ${theme.color.gray.lighter};
    transition: background 0.25s linear;
    width: 1rem;
    height: 1rem;
    padding: 0;
    margin: 0;
  `,
  checked: css``,
  flagged: css``,
  loser: css``
};

export default ({
  row,
  column,
  isSelected,
  isFlagged,
  boardValue,
  id
}: IProps): JSX.Element => {
  /* eslint-disable-next-line */
  console.log('GameButton   ', boardValue);

  const renderSelected = () => {
    return (
      <button css={[styles.btn, styles.checked]} disabled={isSelected}>
        {boardValue === 0 ? '' : boardValue}
      </button>
    );
  };

  const renderEnabled = () => {
    return (
      <button
        data-row={row}
        data-column={column}
        id={id}
        css={styles.btn}
        disabled={isSelected}
      >
        {boardValue === 0 ? '' : boardValue}
      </button>
    );
  };

  const renderFlagged = () => {
    return (
      <button
        data-row={row}
        data-column={column}
        id={id}
        css={[styles.btn, styles.flagged]}
      >
        {boardValue === 0 ? '' : boardValue}
      </button>
    );
  };

  const renderLoss = () => {
    return (
      <button css={[styles.btn, styles.loser]}>
        {boardValue === 0 ? '' : boardValue}
      </button>
    );
  };

  const render = (): JSX.Element => {
    if (isSelected && boardValue === BoardValues.Bomb) {
      return renderLoss();
    } else if (isSelected) {
      return renderSelected();
    } else if (isFlagged) {
      return renderFlagged();
    } else {
      return renderEnabled();
    }
  };

  return render();
};
