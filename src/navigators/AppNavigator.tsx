import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from 'src/screens/ProfileScreen';
import { ROUTES } from './routes';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={ROUTES.HOME}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};
