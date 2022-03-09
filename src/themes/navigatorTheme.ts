import { DefaultTheme } from '@react-navigation/native';
import { Theme } from '.';

export const getNavigatorTheme = (theme: Theme) => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
});
