import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './utils/UserContext';
import { AppNavigator } from './AppNavigator';
import { navigationRef } from './NavigatorRef';

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
