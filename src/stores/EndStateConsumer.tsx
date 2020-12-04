import React, { useContext, PropsWithChildren } from 'react';

import { AppStoreContext } from './AppStoreProvider';

interface IProps extends PropsWithChildren<any> {}

export default ({ children }: IProps): JSX.Element => {
  const { result, playAgain, reset } = useContext(AppStoreContext);
  return children({ result, playAgain, reset });
};
