import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider, useTheme, getNavigatorTheme } from 'src/themes';
import { AuthProvider, useAuth } from 'src/contexts/AuthProvider';
import { Layout, Spinner } from 'src/components';

import { AppNavigator } from 'src/navigators/AppNavigator';
import { AuthNavigator } from 'src/navigators/AuthNavigator';
import './src/translations/i18n';
/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Root />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
};
export default App;

const Root: React.FC = () => {
  const { theme } = useTheme();
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={getNavigatorTheme(theme)}>
      {currentUser !== null ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
