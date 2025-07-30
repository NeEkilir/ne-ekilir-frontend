import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { Image } from 'react-native';

type ProductListRouteProp = RouteProp<RootStackParamList, 'Detay'>;
type ProductListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detay'
>;

export default function ProductList({
  route,
}: {
  route: ProductListRouteProp;
}) {
  const { monthId } = route.params;
  const navigation = useNavigation<ProductListNavigationProp>();

  const [product, setProduct] = useState<any[]>([]);
  const [monthDetail, setMonthDetail] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    tAxios
      .call({
        api: RestManagerApiList.GET_PRODUCT_LIST,
        pathVariable: { id: monthId },
      })
      .then((res: any) => {
        setProduct(res);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    tAxios
      .call({
        api: RestManagerApiList.GET_MONTH_DETAIL,
        pathVariable: { id: monthId },
      })
      .then((res: any) => setMonthDetail(res));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>
         <Text style={{ fontWeight:"bold" }}>{monthDetail?.monthNameTr}</Text> ayında ekilebilecekler
      </Text>
      <View
        style={{ height: 2, backgroundColor: '#ccc', marginVertical: 10 }}
      />
      <FlatList
        data={product}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
              marginVertical: 8,
              backgroundColor: '#eee',
              borderRadius: 8,
            }}
            onPress={() => navigation.navigate('Ürün', { productId: item.id })}
          >
            <Image
              source={require('../assets/listResim.png')}
              style={{ width: 24, height: 24, marginRight: 10 }}
            />
            <Text style={{ fontSize: 18 }}>{item?.productNameTr}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
