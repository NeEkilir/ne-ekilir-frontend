import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { AirbnbRating, Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'Ürün'>;

export default function ProductDetail({
  route,
}: {
  route: ProductDetailRouteProp;
}) {
  const { productId } = route.params;
  const [productDetail, setProductDetail] = useState<any>();
  const [rating, setRating] = useState<any>();
  const [productAVGRate, setProductAVGRate] = useState<any>();

  const userId = 2;

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

  useEffect(() => {
    tAxios
      .call({
        api: RestManagerApiList.PRODUCT_AVG_RATE,
        pathVariable: { id: productId },
      })
      .then((res: any) => {
        setProductAVGRate(res);
      });
  }, [rating]);

  useEffect(() => {
    if (!rating) {
      tAxios
        .call({
          api: RestManagerApiList.GET_RATING,
          pathVariable: { productId: productId, userId: userId },
        })
        .then((res: any) => {
          setRating(res || { rating: 0 });
        });
    }
  }, [rating]);

  const ratingCompleted = (tempRate: any) => {
    if (rating?.id) {
      tAxios
        .call({
          api: RestManagerApiList.EDIT_RATING,
          pathVariable: { id: rating?.id },
          body: { productId: productId, userId: userId, rate: tempRate },
        })
        .then((res: any) => {
          setRating(res || { rating: 0 });
        });
    } else {
      tAxios
        .call({
          api: RestManagerApiList.SAVE_RATING,
          body: { productId: productId, userId: userId, rate: tempRate },
        })
        .then((res: any) => {
          setRating(res || { rating: 0 });
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 11,
        }}
      >
        <Image
          source={require('../assets/listResim.png')}
          style={{ width: 24, height: 24, marginTop: 5, marginRight: 8 }}
        />
        <Text style={{ fontSize: 24 }}>{productDetail?.productNameTr}</Text>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: '#ccc',
          marginVertical: 10,
          marginRight: 10,
        }}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 17,
          marginBottom: -2,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        Nasıl Ekilir?
      </Text>
      <Text
        style={{ fontSize: 16, color: '#555', marginLeft: 10, marginRight: 10 }}
      >
        {productDetail?.plantedDetail}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}
      >
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => ratingCompleted(star)}>
            <Icon
              name={star <= rating?.rating ? 'star' : 'star-o'}
              size={32}
              color={star <= rating?.rating ? '#FFD700' : '#ccc'}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#555',
            marginLeft: 10,
            marginRight: 10,
            marginTop: -20,
          }}
        >
          {productAVGRate?.avgRate ? (
            <Text>
              <Text>{'Ort. Puan:'}</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                {productAVGRate?.avgRate}
              </Text>
            </Text>
          ) : (
            ''
          )}
        </Text>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: '#ccc',
          marginVertical: 10,
          marginRight: 10,
        }}
      />
    </View>
  );
}
