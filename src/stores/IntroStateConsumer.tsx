import React, { useContext, PropsWithChildren } from 'react';

import { AppStoreContext } from './AppStoreProvider';

interface IProps extends PropsWithChildren<any> {}

export default ({ children }: IProps): JSX.Element => {
  const { rows, columns, bombs, startGame } = useContext(AppStoreContext);
  return children({ rows, columns, bombs, startGame });
};
