import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { Image } from 'react-native';
import { AddRequestModal } from './modal/AddRequestModal';
import { RootStackParamList } from '../AppNavigator';

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
  const [product, setProduct] = useState<any[]>();
  const [monthDetail, setMonthDetail] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isShowRequestModal, setIsShowRequestModal] = useState<any>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsShowRequestModal(true);
          }}
          style={{
            backgroundColor: '#4CAF50',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
            marginRight: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
            + Ekle
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!product) {
      tAxios
        .call({
          api: RestManagerApiList.GET_PRODUCT_LIST,
          pathVariable: { id: monthId },
        })
        .then((res: any) => {
          setProduct(
            res.sort((a: any, b: any) =>
              a.productNameTr.localeCompare(b.productNameTr, 'tr', {
                sensitivity: 'base',
              }),
            ),
          );
        })
        .finally(() => setLoading(false));
    }
  }, [product]);

  useEffect(() => {
    if (!monthDetail) {
      tAxios
        .call({
          api: RestManagerApiList.GET_MONTH_DETAIL,
          pathVariable: { id: monthId },
        })
        .then((res: any) => setMonthDetail(res));
    }
  }, [monthDetail]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <View style={{ flex: 1, padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {monthDetail?.monthNameTr} ayı ekilebilecekler
          </Text>
        </View>
        <View
          style={{ height: 2, backgroundColor: '#ccc', marginVertical: 10 }}
        />
        <FlatList
          data={product}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                marginVertical: 8,
                backgroundColor: '#eee',
                borderRadius: 8,
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Image
                  source={require('../assets/listResim.png')}
                  style={{ width: 24, height: 24, marginRight: 10 }}
                />
                <Text style={{ fontSize: 18 }}>
                  {item?.productNameTr || ''}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4CAF50',
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 6,
                }}
                onPress={() => {
                  navigation.navigate('Ürün', { productId: item.id });
                }}
              >
                <Text style={{ color: 'white', fontSize: 14 }}>
                  Nasıl Ekilir?
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {isShowRequestModal && (
        <AddRequestModal
          show={isShowRequestModal}
          onClose={() => setIsShowRequestModal(false)}
        />
      )}
    </>
  );
}
