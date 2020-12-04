import React from 'react';
import { css } from '@emotion/core';

import AppStoreProvider from './stores/AppStoreProvider';
import Screens from './Screens';

import theme from './styles/theme';

const styles = {
  main: css`
    font-family: SFMono-Regular, Menlo, Monaco,
               Consolas, "Liberation Mono",
               "Courier New", monospace;
    display: block;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 1rem;
    background: rgb(238,238,238);
    background: radial-gradient(circle, ${theme.color.gray.lighter} 28%, ${theme.color.gray.medium} 100%);
  `
};

export default () => {
  return (
    <AppStoreProvider>
      <main css={styles.main}>
        <Screens />
      </main>
    </AppStoreProvider>
  );
};
