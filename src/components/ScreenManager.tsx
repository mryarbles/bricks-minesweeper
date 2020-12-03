import React, { useContext, FC, ReactElement } from 'react';

import { AppStoreContext } from '../stores/AppStoreProvider';
import Screens, { IScreenConfig } from '../constants/Screens';

export default () => {
  const { screen } = useContext(AppStoreContext);
  const screenConfig: IScreenConfig = Screens[screen];
  return screenConfig.factory();
};
