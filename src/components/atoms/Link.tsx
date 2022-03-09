import React, { useCallback } from 'react';
import { Alert, Linking, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from 'src/themes';
import type { Theme } from 'src/themes';
interface LinkProps {
  url: string;
  children: string;
}

export const Link: React.FC<LinkProps> = ({ url, children }) => {
  const { theme } = useTheme();
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Pressable onPress={handlePress}>
      <Text style={styles(theme).link}>{children}</Text>
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    link: {
      color: theme.colors.primary,
    },
  });
