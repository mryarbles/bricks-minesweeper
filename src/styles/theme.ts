import ColorTool from 'color';
import toRem from 'utils/toRem';
import breakpoints from './breakpoints';
import mixins from './mixins';

const black = ColorTool('#000000');
const blue = ColorTool('#005BF0');

const fontFamily = {
  base: '"Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  fontAwesome: '"Font Awesome 5 Free"'
};

const color = {
  white: '#ffffff',
  black: black.hex(),
  blue: {
    base: blue.hex(),
    medium: blue.lighten(0.25).hex(),
    light: blue.lighten(0.75).hex(),
    dark: '#0049C0'
  },
  gray: {
    offwhite: '#fafafa',
    dark: '#222222',
    mediumdark: '#454545',
    medium: '#595959',
    mediumlight: '#777777',
    light: '#b9b9b9',
    lightBorder: '#dee2e6',
    lighter: '#e9ecef'
  },
  green: {
    success: '#28a745'
  },
  yellow: {
    warning: '#ffc107'
  },
  red: {
    error: '#f05228'
  }
};

const gradient = {
  button: `linear-gradient(to bottom, ${color.blue.medium}, ${color.blue.base})`,
  buttonHover: `linear-gradient(to bottom,  ${color.blue.medium}, ${color.blue.dark})`
};

const fontSize = {
  base: {
    px: 16,
    rem: toRem(16)
  },
  h1: {
    px: 36,
    rem: toRem(36)
  },
  twentyfour: {
    px: 24,
    rem: toRem(24)
  },
  fourteen: {
    px: 14,
    rem: toRem(14)
  },
  thirteen: {
    px: 13,
    rem: toRem(13)
  }
};

const fontWeight = {
  base: 400,
  bold: 500,
  bold600: 600
};

const theme = {
  fontFamily,
  fontSize,
  fontWeight,
  color,
  gradient,
  breakpoints,
  toRem,
  mixins
};

export default theme;
