import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './themes';

export type Theme = typeof lightTheme | typeof darkTheme;

interface ThemeProviderValueProps {
  theme: Theme;
  isDarkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = React.createContext<
  ThemeProviderValueProps | undefined
>(undefined);

export const ThemeProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setDarkMode] = useState<boolean>(colorScheme === 'dark');

  useEffect(() => {
    setDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeProviderValueProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('Try to use useTheme hook without a context provider');
  }

  return context;
};
