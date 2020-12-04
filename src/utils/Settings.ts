import { STORAGE_KEYS } from '../stores/AppStoreProvider';

const getSetting = (key: string, defaultValue?: any): any => {
  let value = null;
  if (window && window.localStorage) {
    value = window.localStorage.getItem(`${STORAGE_KEYS.BASE}${key}`);
  }

  if (!value && defaultValue) {
    return defaultValue;
  }

  return value;
};

const setSetting = (key: string, value?: any): void => {
  if (window && window.localStorage) {
    if (!value) {
      window.localStorage.removeItem(`${STORAGE_KEYS.BASE}${key}`);
    } else {
      window.localStorage.setItem(
        `${STORAGE_KEYS.BASE}${key}`,
        value as string
      );
    }
  }
};

export default {
  getSetting,
  setSetting
};
