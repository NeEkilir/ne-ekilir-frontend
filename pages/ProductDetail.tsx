import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeleteCommentModal } from './modal/DeleteCommentModal';
import BottomNavBar from './layout/FooterNavBar';

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
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState<any>();

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/listResim.png')}
            style={{ width: 17, height: 17, marginRight: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Nasıl Ekilir?</Text>
        </View>

        <Text style={{ fontSize: 12, color: '#555' }}>
          Puan:{' '}
          <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
            {productAVGRate?.avgRate || 0}
          </Text>
        </Text>
      </View>
      <Text style={{ fontSize: 16, color: '#555', marginHorizontal: 10 }}>
        {productDetail?.plantedDetail}
      </Text>
      <View style={{ margin: 3, display: 'flex', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => setIsShowCommentModal(true)}
          style={{
            borderColor: '#363636a9',
            borderWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 2,
            paddingHorizontal: 10,
            borderRadius: 8,
            width: 110,
          }}
        >
          <Text
            style={{
              color: '#363636a9',
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
      <View style={{ flex: 1 }}>
        <View style={{ padding: 5, marginBottom: 40 }}>
          {activeTab === 'comments' && (
            <>
              {!commentList?.length && (
                <View>
                  <Text>Henüz yorum yapılmamış..</Text>
                </View>
              )}
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
                      margin: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      elevation: 2,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
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
                      {userInfo?.id === item?.userId?.id && (
                        <TouchableOpacity
                          style={{
                            paddingVertical: 2,
                            paddingHorizontal: 3,
                            borderRadius: 6,
                            borderWidth: 1,
                            borderColor: '#F44336',
                          }}
                          onPress={() => {
                            setShowDeleteCommentModal(item?.id);
                          }}
                        >
                          <Icon name={'trash'} size={16} color="#F44336" />
                        </TouchableOpacity>
                      )}
                    </View>
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
        <BottomNavBar activeRoute="" navigation={navigation} />
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
      {showDeleteCommentModal && (
        <DeleteCommentModal
          show={showDeleteCommentModal ? true : false}
          onClose={(isReload?: any) => {
            setShowDeleteCommentModal(null);
            if (isReload) {
              getCommentList(productId);
            }
          }}
          id={showDeleteCommentModal}
        />
      )}
    </View>
  );
}
