import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import DetailsScreen from './pages/DetailsScreen';
import { setupAxiosInterceptors } from './call_config';
import ProductScreen from './pages/ProductScreen';

export type RootStackParamList = {
  Aylar: undefined;
  Detay: { monthId: string };
  Ürün: { productId: string };
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
        <Stack.Screen name="Aylar" component={HomeScreen} />
        <Stack.Screen name="Detay" component={DetailsScreen} />
        <Stack.Screen name="Ürün" component={ProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
