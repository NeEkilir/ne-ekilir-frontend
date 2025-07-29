import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Ürün'>;

export default function ProductScreen({
  route,
}: {
  route: ProductScreenRouteProp;
}) {
  const { productId } = route.params;
  const [productDetail, setProductDetail] = useState<any>();

  useEffect(() => {
    tAxios
      .call({
        api: RestManagerApiList.GET_PRODUCT_DETAIL,
        pathVariable: { id: productId },
      })
      .then((res: any) => {
        setProductDetail(res);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        {productDetail?.productNameTr}
      </Text>
      <View
        style={{ height: 2, backgroundColor: '#ccc', marginVertical: 10 }}
      />
      <Text style={{ fontSize: 16, textAlign: 'center', color: '#555' }}>
        {productDetail?.plantedDetail}
      </Text>
    </View>
  );
}
