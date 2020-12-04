import { css } from '@emotion/core';

const transition = (
  cssProps: string | string[] = 'all',
  duration: string = '.25s',
  delay: string = '0'
) => {
  if (typeof cssProps === 'string') {
    return css`
      transition-property: ${cssProps};
      transition-duration: ${duration};
      transition-delay: ${delay};
    `;
  } else {
    return css`
      transition: ${cssProps.join(', ')};
    `;
  }
};

export default transition;
