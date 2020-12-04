import breakpoints, { IBreakPoint } from '../breakpoints';

export default function(breakpointKey: string, styles: string = '') {
  const bp: IBreakPoint = breakpoints[breakpointKey];

  const { distance, test } = bp;

  return `
    @media (${test}: ${distance}px) {
      ${styles}
    }
  `;
}
