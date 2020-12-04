import React, { ReactHTMLElement } from 'react';
import { css } from '@emotion/core';
import theme from 'styles/theme';
import { FaFontAwesomeFlag, FaBomb } from 'react-icons/fa';

import { BoardValues, ResultValues } from 'stores/AppStoreProvider';

interface IProps {
  id: string;
  row: number;
  column: number;
  isSelected: boolean;
  isFlagged: boolean;
  boardValue: number;
  result: number;
  hasResult: boolean;
}

const styles = {
  btn: css`
    font-size: 0.5rem;
    background: ${theme.color.gray.lighter};
    transition: background 0.25s linear;
    width: 2rem;
    height: 2rem;
    padding: 0;
    margin: 0;
    svg {
      pointer-events: none;
    }
  `,
  selected: css`
    background: ${theme.color.gray.lighter};
  `,
  flagged: css`
    color: ${theme.color.red.error};
  `,
  loser: css`
    background: ${theme.color.red.error};
  `,
  enabled: css`
    &:hover {
      background: ${theme.color.blue.light};
    }
  `
};

export default ({
  row,
  column,
  isSelected,
  isFlagged,
  boardValue,
  id,
  hasResult,
  result
}: IProps): JSX.Element => {
  const renderInner = (): JSX.Element | number => {
    if (boardValue === BoardValues.Bomb && result === ResultValues.Loser) {
      return <FaBomb />;
    } else if (isSelected) {
      return boardValue === 0 ? null : boardValue;
    } else if (isFlagged) {
      return <FaFontAwesomeFlag />;
    }
    return null;
  };

  const renderOuter = () => {
    const props: any = {
      css: [styles.btn],
      'data-row': row,
      'data-column': column,
      id
    };

    if (boardValue === BoardValues.Bomb && result === ResultValues.Loser) {
      props.disabled = true;
      props.css.push(styles.loser);
    } else if (isSelected) {
      props.css.push(styles.selected);
      props.disabled = true;
    } else if (isFlagged) {
      props.css.push(styles.flagged);
    } else {
      props.css.push(styles.enabled);
    }

    return <button {...props}>{renderInner()}</button>;
  };

  const render = (): JSX.Element => {
    return renderOuter();
  };

  return render();
};
