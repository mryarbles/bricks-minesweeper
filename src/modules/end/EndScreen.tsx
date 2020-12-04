import React, { useState } from 'react';
import { css } from '@emotion/core';
import Button from 'reactstrap/lib/Button';

import theme from 'styles/theme';

export interface IEndScreenProps {
  result: string;
  playAgain: () => void;
  reset: () => void;
}

const styles = {
  container: css`
    font-weight: ${theme.fontWeight.base};
    width: 400px;
    height: 300px;
    text-align: center;
    ${theme.mixins.centeredDiv}
  `,
  btn: css`
    margin: 0 0.5rem;
  `
};

export default ({ result, playAgain, reset }: IEndScreenProps): JSX.Element => {
  return (
    <div css={styles.container}>
      <Button
        css={styles.btn}
        onClick={() => {
          playAgain();
        }}
      >
        Play Again?
      </Button>
      <Button
        css={styles.btn}
        color="link"
        onClick={() => {
          reset();
        }}
      >
        Reset Game
      </Button>
    </div>
  );
};
