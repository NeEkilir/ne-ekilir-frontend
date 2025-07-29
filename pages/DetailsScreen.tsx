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

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Detay'>;
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detay'
>;

export default function DetailsScreen({
  route,
}: {
  route: DetailsScreenRouteProp;
}) {
  const { monthId } = route.params;
  const navigation = useNavigation<DetailsScreenNavigationProp>();

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
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        {monthDetail?.monthNameTr}
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
              padding: 15,
              marginVertical: 8,
              backgroundColor: '#eee',
              borderRadius: 8,
            }}
            onPress={() => navigation.navigate('Ürün', { productId: item.id })}
          >
            <Text style={{ fontSize: 18 }}>{item?.productNameTr}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
