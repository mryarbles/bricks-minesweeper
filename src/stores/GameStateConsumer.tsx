import React, { useContext, PropsWithChildren, FC } from 'react';

import { AppStoreContext } from './AppStoreProvider';

interface IProps extends PropsWithChildren<any> {}

export default ({ children }: IProps): JSX.Element => {
  const {
    rows,
    columns,
    game,
    board,
    flags,
    play,
    flag,
    isGameActive
  } = useContext(AppStoreContext);
  return children({
    rows,
    columns,
    game,
    board,
    flags,
    play,
    flag,
    isGameActive
  });
};
