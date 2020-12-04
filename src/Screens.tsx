import React, { useContext, FC, ReactElement } from 'react';

import { AppStoreContext } from './stores/AppStoreProvider';
import ScreensConfig, { IScreenConfig } from './ScreensConfig';

export default () => {
  const { screen } = useContext(AppStoreContext);
  const screenConfig: IScreenConfig = ScreensConfig[screen];
  return screenConfig.factory();
};
