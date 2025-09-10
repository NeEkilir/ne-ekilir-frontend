import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MonthList from './pages/MonthList';
import ProductList from './pages/ProductList';
import { setupAxiosInterceptors, tAxios } from './call_config';
import ProductDetail from './pages/ProductDetail';
import TopTenList from './pages/TopTenList';
import PlantingCalendar from './pages/PlantingCalendar';
import { getTokens } from './utils/SecureStorage';
import Login from './pages/Login';
import SplashPage from './pages/SplashPage';
import { UserProvider } from './utils/UserContext';

export type RootStackParamList = {
  Aylar: undefined;
  Detay: { monthId: string };
  Ürün: { productId: string };
  'Top 10': undefined;
  'Ekim Takvimi': undefined;
  Login: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>();

  useEffect(() => {
    setupAxiosInterceptors(setIsLoggedIn);

    const checkLogin = async () => {
      const tokens = await getTokens();
      setIsLoggedIn(tokens?.accessToken ? true : false);
    };

    checkLogin();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Aylar" component={MonthList} />
              <Stack.Screen name="Detay" component={ProductList} />
              <Stack.Screen name="Ürün" component={ProductDetail} />
              <Stack.Screen name="Top 10" component={TopTenList} />
              <Stack.Screen name="Ekim Takvimi" component={PlantingCalendar} />
            </>
          ) : isLoggedIn === false ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name="Splash"
              component={SplashPage}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
