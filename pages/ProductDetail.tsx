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
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { AirbnbRating, Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AddCommentModal } from './modal/AddCommentModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { format, parse } from 'date-fns';
import { AddProfileProductModal } from './modal/AddProfileProductModal';
import { useUser } from '../utils/UserContext';
import { RootStackParamList } from '../AppNavigator';

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
  const { userInfo, setUserInfo } = useUser();

  useEffect(() => {
    if (navigation && productDetail) {
      navigation.setOptions({
        headerTitle: productDetail?.productNameTr,
        headerRight: () => (
          <TouchableOpacity
            style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginRight: 10,
            }}
            onPress={() => setIsShowAddProfileModal(true)}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>+ Ekildi</Text>
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerTitle: '',
        headerRight: () => (
          <TouchableOpacity
            style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 6,
            }}
            onPress={() => setIsShowAddProfileModal(true)}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>+ Ekildi</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, productDetail]);

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
          pathVariable: { productId: productId, userId: userInfo?.id },
        })
        .then((res: any) => {
          setRating(res || { rating: 0 });
        });
    }
  }, [rating]);

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
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 11,
          }}
        >
          <Image
            source={require('../assets/listResim.png')}
            style={{ width: 17, height: 17, marginTop: 2, marginRight: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Nasıl Ekilir?</Text>
        </View>
      </View>
      <Text
        style={{ fontSize: 16, color: '#555', marginLeft: 10, marginRight: 10 }}
      >
        {productDetail?.plantedDetail}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: '#555',
          marginRight: 10,
        }}
      >
        {productAVGRate?.avgRate ? (
          <Text style={{ textAlign: 'right' }}>
            <Text>{'Puan:'}</Text>
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
            <Text>{'Puan:'}</Text>
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

      {commentList?.length ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 3,
              paddingLeft: 8,
            }}
          >
            Yorumlar
          </Text>

          <TouchableOpacity
            onPress={() => setIsShowCommentModal(true)}
            style={{
              backgroundColor: '#555555ff',
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
        </View>
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
          name={productDetail?.productNameTr}
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
