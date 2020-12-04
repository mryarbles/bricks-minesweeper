export interface IBreakPoint {
  distance: number;
  test: string;
}

export interface IBreakPoints {
  [key: string]: IBreakPoint;
}

// based on https://getbootstrap.com/docs/4.3/layout/overview/
const breakpoints: IBreakPoints = {
  sm: {
    test: 'min-width',
    distance: 576
  },
  md: {
    test: 'min-width',
    distance: 768
  },
  lg: {
    test: 'min-width',
    distance: 992
  },
  xl: {
    test: 'min-width',
    distance: 1200
  }
};

export default breakpoints;
