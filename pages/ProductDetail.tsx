import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { AirbnbRating, Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AddCommentModal } from './modal/AddCommentModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { format, parse } from 'date-fns';
import { AddProfileProductModal } from './modal/AddProfileProductModal';

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
  const [isShowCommentModal, setIsShowCommentModal] = useState<any>();
  const [isShowAddProfileModal, setIsShowAddProfileModal] = useState<any>();
  const [commentList, setCommentList] = useState<any>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const userId = 2;

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => setIsShowCommentModal(true)}
            style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
              + Yorum Yap
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation]);

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

  const getCommentList = (productId: any) => {
    tAxios
      .call({
        api: RestManagerApiList.GET_COMMENT_LIST,
        pathVariable: { id: productId },
      })
      .then((res: any) => {
        setCommentList(res);
      });
  };

  useEffect(() => {
    if (productId) {
      getCommentList(productId);
    }
  }, [productId]);

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
          display: 'flex',
          justifyContent: 'space-between',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nasıl Ekilir?</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#4CAF50',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 6,
          }}
          onPress={() => setIsShowAddProfileModal(true)}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>
            + Profile Ekle
          </Text>
        </TouchableOpacity>
      </View>
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
            <Text>
              <Text>{'Ort. Puan:'}</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                {0}
              </Text>
            </Text>
          )}
        </Text>
      </View>
      {commentList?.length ? (
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 0,
            paddingLeft: 8,
          }}
        >
          Yorumlar
        </Text>
      ) : (
        <></>
      )}
      <View
        style={{
          height: 2,
          backgroundColor: '#ccc',
          marginVertical: 10,
        }}
      />
      <FlatList
        data={commentList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            key={item?.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <Text
              style={{ fontSize: 15, fontStyle: 'italic', marginBottom: 5 }}
            >
              {item?.commentHeader}
            </Text>
            <View
              style={{
                justifyContent: 'flex-start',
              }}
            >
              <Text style={{ fontSize: 14, color: '#777' }}>
                {item?.commentDetail}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 10, color: '#777' }}>
                Kullanıcı:{' '}
                <Text style={{ fontStyle: 'italic' }}>
                  {item.userId?.userName}
                </Text>
              </Text>
              <Text style={{ fontSize: 10, color: '#999' }}>
                {item.createTime &&
                  format(new Date(item.createTime), 'dd.MM.yyyy HH:mm')}
              </Text>
            </View>
          </View>
        )}
      />
      {isShowAddProfileModal && (
        <AddProfileProductModal
          show={isShowAddProfileModal}
          onClose={() => setIsShowAddProfileModal(false)}
          productId={productId}
        />
      )}
      {isShowCommentModal && (
        <AddCommentModal
          show={isShowCommentModal}
          onClose={() => setIsShowCommentModal(false)}
          productId={productId}
          getCommentList={getCommentList}
        />
      )}
    </View>
  );
}
