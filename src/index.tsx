import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';

// import bootstrap so that it can be customized.
import './bootstrap.scss';
// font awesome is loaded in index.html file.
import '@fortawesome/fontawesome-free/css/all.css';

import theme from 'styles/theme';
import * as serviceWorker from './serviceWorker';
import App from './App';

const styles = {

}

const rootJsx: JSX.Element = (
  <>
    <Global
      styles={css`
        html {
          font-size: ${theme.fontSize.base.px}px;
        }
        body {
          background: ${theme.color.white};
          margin: 0;
          padding: 0;
          min-height: 100vh;
          max-width: 100vw;
          font-family: ${theme.fontFamily.base};
        }
      `}
    />
    <App />
  </>
);

ReactDOM.render(rootJsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
