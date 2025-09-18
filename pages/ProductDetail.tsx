import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { format } from 'date-fns';
import { AddCommentModal } from './modal/AddCommentModal';
import { AddProfileProductModal } from './modal/AddProfileProductModal';
import { useUser } from '../utils/UserContext';
import { RootStackParamList } from '../AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../style/Style';

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
  const [beneficialList, setBeneficalList] = useState<any>();
  const [detrimentalList, setDetrimentalList] = useState<any>();
  const [activeTab, setActiveTab] = useState<
    'comments' | 'beneficials' | 'detrimentals'
  >('comments');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userInfo } = useUser();

  useEffect(() => {
    if (productDetail) {
      setBeneficalList(
        productDetail?.beneficial
          .split('.')
          .map((e: any) => e.trim())
          ?.filter((x: any) => x),
      );
      setDetrimentalList(
        productDetail?.detrimental
          .split('.')
          .map((e: any) => e.trim())
          ?.filter((x: any) => x),
      );
    }
  }, [productDetail]);

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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: 'row', marginTop: 11 }}>
          <Image
            source={require('../assets/listResim.png')}
            style={{ width: 17, height: 17, marginTop: 2, marginRight: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Nasıl Ekilir?</Text>
        </View>
      </View>
      <Text style={{ fontSize: 16, color: '#555', marginHorizontal: 10 }}>
        {productDetail?.plantedDetail}
      </Text>
      <View>
        <Text
          style={{
            fontSize: 12,
            color: '#555',
            marginTop: 5,
            marginRight: 15,
            textAlign: 'right',
          }}
        >
          {'Puan: '}
          <Text style={{ fontWeight: 'bold' }}>
            {productAVGRate?.avgRate || 0}
          </Text>
        </Text>
      </View>
      <View style={{ marginTop: 0 }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
        >
          {['comments', 'beneficials', 'detrimentals'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 10,
                backgroundColor: activeTab === tab ? '#f9f9f9' : '#fff',
              }}
            >
              <Text
                style={{
                  color: activeTab === tab ? '#4CAF50' : '#555',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  fontSize: 16,
                }}
              >
                {tab === 'comments'
                  ? 'Yorumlar'
                  : tab === 'beneficials'
                  ? 'Yararlılar'
                  : 'Zararlılar'}
              </Text>
              {activeTab === tab && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 3,
                    width: '100%',
                    backgroundColor: '#4CAF50',
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                  }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ flex: 1, padding: 5 }}>
        {activeTab === 'comments' && (
          <>
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
                    style={{
                      fontSize: 15,
                      fontStyle: 'italic',
                      marginBottom: 5,
                    }}
                  >
                    {item?.commentHeader}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#777' }}>
                    {item?.commentDetail}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                onPress={() => setIsShowCommentModal(true)}
                style={{
                  backgroundColor: '#555555a9',
                  paddingVertical: 4,
                  paddingHorizontal: 12,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 3,
                  }}
                >
                  + Yorum Yap
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {activeTab === 'beneficials' && (
          <View style={{ alignItems: 'center', marginTop: 0 }}>
            <ScrollView
              contentContainerStyle={{
                paddingLeft: 5,
                paddingRight: 10,
              }}
              showsVerticalScrollIndicator={true}
            >
              <Text style={{ color: '#000000ff' }}>
                <View style={styles.listContainer}>
                  {beneficialList?.map((x: any, i: any) => {
                    return (
                      x && (
                        <View key={i} style={styles.listItem}>
                          <Text style={styles.listBullet}>{'\u2022'}</Text>
                          <Text style={styles.listText}>{x}</Text>
                        </View>
                      )
                    );
                  })}
                </View>
              </Text>
            </ScrollView>
          </View>
        )}
        {activeTab === 'detrimentals' && (
          <View style={{ alignItems: 'center', marginTop: 0 }}>
            <ScrollView
              contentContainerStyle={{
                paddingLeft: 5,
                paddingRight: 10,
              }}
              showsVerticalScrollIndicator={true}
            >
              <Text style={{ color: '#000000ff' }}>
                <View style={styles.listContainer}>
                  {detrimentalList?.map((x: any, i: any) => {
                    return (
                      x && (
                        <View key={i} style={styles.listItem}>
                          <Text style={styles.listBulletRed}>{'\u2022'}</Text>
                          <Text style={styles.listText}>{x}</Text>
                        </View>
                      )
                    );
                  })}
                </View>
              </Text>
            </ScrollView>
          </View>
        )}
      </View>
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
