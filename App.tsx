import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MonthList from './pages/MonthList';
import ProductList from './pages/ProductList';
import { setupAxiosInterceptors } from './call_config';
import ProductDetail from './pages/ProductDetail';
import TopTenList from './pages/TopTenList';

export type RootStackParamList = {
  Aylar: undefined;
  Detay: { monthId: string };
  Ürün: { productId: string };
  'Top 10': undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setupAxiosInterceptors(setLoading);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Aylar" component={MonthList} />
        <Stack.Screen name="Detay" component={ProductList} />
        <Stack.Screen name="Ürün" component={ProductDetail} />
        <Stack.Screen name="Top 10" component={TopTenList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
