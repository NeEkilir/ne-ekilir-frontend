import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MonthList from './pages/MonthList';
import ProductList from './pages/ProductList';
import { setupAxiosInterceptors } from './call_config';
import ProductDetail from './pages/ProductDetail';
import TopTenList from './pages/TopTenList';
import Profile from './pages/Profile';
import { getTokens } from './utils/SecureStorage';
import Login from './pages/Login';
import SplashPage from './pages/SplashPage';
import { useUser } from './utils/UserContext';

export type RootStackParamList = {
  Aylar: undefined;
  Detay: { monthId: string };
  Ürün: { productId: string };
  Top10: undefined;
  Profil: undefined;
  Login: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isLogin, setIsLogin, handleRefresh } = useUser();

  useEffect(() => {
    setupAxiosInterceptors(setIsLogin, handleRefresh);

    const checkLogin = async () => {
      const tokens = await getTokens();
      setIsLogin(tokens ? true : false);
    };

    checkLogin();
  }, []);

  return (
    <Stack.Navigator>
      {isLogin ? (
        <>
          <Stack.Screen name="Aylar" component={MonthList} />
          <Stack.Screen name="Detay" component={ProductList} />
          <Stack.Screen name="Ürün" component={ProductDetail} />
          <Stack.Screen name="Top10" component={TopTenList} />
          <Stack.Screen name="Profil" component={Profile} />
        </>
      ) : isLogin === false ? (
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {props => <Login {...props} setIsLoggedIn={setIsLogin} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="Splash"
          component={SplashPage}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
