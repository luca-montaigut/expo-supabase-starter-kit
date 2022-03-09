const palette = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF0000',
  blue: '#0000FF',
  green: '#00FF00',
};

const baseTheme = { palette };

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: palette.blue,
    danger: baseTheme.palette.red,
    statusBar: 'dark-content',
    mainBackground: baseTheme.palette.white,
    mainTextColor: baseTheme.palette.black,
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...lightTheme.colors,
    statusBar: 'light-content',
    mainBackground: baseTheme.palette.black,
    mainTextColor: baseTheme.palette.white,
  },
};
