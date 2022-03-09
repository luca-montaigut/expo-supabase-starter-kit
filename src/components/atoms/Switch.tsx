import React from 'react';
import { Switch as RNSwitch } from 'react-native';
import { useTheme } from 'src/themes';

export const Switch: React.VFC = () => {
  const { isDarkMode, setDarkMode } = useTheme();

  return (
    <RNSwitch
      onValueChange={switchState => setDarkMode(switchState)}
      value={isDarkMode}
    />
  );
};
