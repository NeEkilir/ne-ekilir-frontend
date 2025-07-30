import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'Ürün'>;

export default function ProductDetail({
  route,
}: {
  route: ProductDetailRouteProp;
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
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop:11
        }}
      >
        <Image
          source={require('../assets/listResim.png')}
          style={{ width: 24, height: 24, marginTop: 5, marginRight: 8 }}
        />
        <Text style={{ fontSize: 24 }}>{productDetail?.productNameTr}</Text>
      </View>
      <View
        style={{ height: 2, backgroundColor: '#ccc', marginVertical: 10 }}
      />
      <Text style={{ fontSize: 16, textAlign: 'center', color: '#555' }}>
        {productDetail?.plantedDetail}
      </Text>
    </View>
  );
}
