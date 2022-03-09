import React from 'react';
import { StyleSheet, Text as BaseText } from 'react-native';
import { useTheme } from 'src/themes';
import type { Theme } from 'src/themes';

export const Title: React.FC = ({ children }) => {
  const { theme } = useTheme();

  return <BaseText style={styles(theme).text}>{children}</BaseText>;
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.mainTextColor,
      fontSize: 50,
    },
  });
