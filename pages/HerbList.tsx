import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { tAxios } from '../call_config';
import { DeletePlantingModal } from './modal/DeletePlantingModal';
import { PlantingDetailModal } from './modal/PlantingDetailModal';
import { useUser } from '../utils/UserContext';
import { RootStackParamList } from '../AppNavigator';
import { LogoutModal } from './modal/LogoutModal';
import { Swipeable } from 'react-native-gesture-handler';
import BottomNavBar from './layout/FooterNavBar';

type HerbListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BitkiListesi'
>;

export default function HerbList({
  navigation,
}: {
  navigation: HerbListNavigationProp;
}) {
  const [productList, setProductList] = useState<any>();
  const [isDeleteModal, setİsDeleteModal] = useState<any>();
  const [isDetailModal, setİsDetailModal] = useState<any>();
  const { userInfo, setUserInfo } = useUser();
  const [isLogout, setIsLogout] = useState<any>();

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerTitle: 'Bitki Listem',
        headerTitleAlign: 'left',
      });
    }
  }, [navigation]);

  const getProductList = (userId: any) => {
    tAxios
      .call({
        api: RestManagerApiList.GET_PROFILE_PRODUCT,
        pathVariable: { userId: userId },
      })
      .then((res: any) => {
        const tempData: any = res;
        tempData.push({
          id: 'test',
        });
        setProductList(tempData);
      });
  };

  useEffect(() => {
    if (userInfo?.id) {
      getProductList(userInfo?.id);
    }
  }, [userInfo?.id]);

  const renderRightActions = (item: any) => {
    return (
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <TouchableOpacity
          style={[localStyles.actionButton, { backgroundColor: '#3d6094ff' }]}
          onPress={() => {
            console.log('Alarm kuruldu: ', item.id);
          }}
        >
          <Text style={localStyles.actionText}>Alarm Kur</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[localStyles.actionButton, { backgroundColor: '#af4139ff' }]}
          onPress={() => {
            setİsDeleteModal(item.id);
          }}
        >
          <Text style={localStyles.actionText}>Sil</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 15,
            padding: 10,
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#FFF',
          }}
        >
          {'Ekim Takviminiz'}
        </Text>
      </View>
      <View style={{ height: 1, backgroundColor: '#ccc' }} />
      {!productList?.length && (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#FFF',
          }}
        >
          <Text
            style={{
              fontSize: 15,
              margin: 10,
            }}
          >
            {'Takviminizde ürün bulunmamaktadır.'}
          </Text>
        </View>
      )}
      <FlatList
        data={productList}
        style={{ marginBottom: 5 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) =>
          item?.id === 'test' ? (
            <View
              style={{
                padding: 20,
              }}
            ></View>
          ) : (
            <Swipeable
              key={index + '' + item?.id}
              renderRightActions={() => renderRightActions(item)}
            >
              <View
                key={item?.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#fff',
                  borderRadius: String(index) === '0' ? 0 : 8,
                  borderBottomRightRadius: 8,
                  borderBottomStartRadius: 8,
                  padding: 10,
                  marginBottom: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                  >
                    <Text style={{ marginBottom: 5 }}>{index + 1 + '- '}</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontStyle: 'italic',
                        marginBottom: 5,
                      }}
                    >
                      {item?.productId?.productNameTr}
                    </Text>
                    <Text style={{ fontSize: 15, marginBottom: 5 }}>
                      {' (' + (item?.aliasName ? item?.aliasName : '--') + ')'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#6d6d6dff',
                        fontWeight: 'bold',
                      }}
                    >
                      Ekim Tarihi:
                    </Text>
                    <Text style={{ fontSize: 10, color: '#6d6d6dff' }}>
                      {item.plantingDate &&
                        format(new Date(item.plantingDate), 'dd.MM.yyyy HH:mm')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#4CAF50',
                      width: 85,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      setİsDetailModal(item);
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        textAlign: 'center',
                      }}
                    >
                      Detaylı Ekim Takvimini Gör
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Swipeable>
          )
        }
      />
      {isDetailModal && (
        <PlantingDetailModal
          show={isDetailModal ? true : false}
          onClose={() => setİsDetailModal(null)}
          data={isDetailModal}
        />
      )}
      {isDeleteModal && (
        <DeletePlantingModal
          show={isDeleteModal ? true : false}
          onClose={(isRefresh?: any) => {
            if (isRefresh) {
              getProductList(userInfo?.id);
            }
            setİsDeleteModal(null);
          }}
          name={
            productList?.find((e: any) => e?.id === isDeleteModal)?.productId
              ?.productNameTr
          }
          id={isDeleteModal}
        />
      )}
      {isLogout && (
        <LogoutModal show={isLogout} onClose={() => setIsLogout(false)} />
      )}
      <BottomNavBar activeRoute="BitkiListesi" navigation={navigation} />
    </>
  );
}

const localStyles = StyleSheet.create({
  actionButton: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
