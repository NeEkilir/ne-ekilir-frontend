import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { tAxios } from '../call_config';
import { DeletePlantingModal } from './modal/DeletePlantingModal';
import { PlantingDetailModal } from './modal/PlantingDetailModal';
import { useUser } from '../utils/UserContext';

type PlantingCalendarRouteProp = RouteProp<RootStackParamList, 'Ekim Takvimi'>;
type PlantingCalendarNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Ekim Takvimi'
>;

export default function PlantingCalendar({
  route,
}: {
  route: PlantingCalendarRouteProp;
}) {
  const [productList, setProductList] = useState<any>();
  const [isDeleteModal, setİsDeleteModal] = useState<any>();
  const [isDetailModal, setİsDetailModal] = useState<any>();
  const { userInfo } = useUser();

  const getProductList = (userId: any) => {
    tAxios
      .call({
        api: RestManagerApiList.GET_PROFILE_PRODUCT,
        pathVariable: { userId: userId },
      })
      .then((res: any) => {
        setProductList(res);
      });
  };

  useEffect(() => {
    if (userInfo?.id) {
      getProductList(userInfo?.id);
    }
  }, [userInfo?.id]);

  return (
    <>
      <View
        style={{
          backgroundColor: '#ccc',
          marginVertical: 5,
        }}
      />
      <FlatList
        data={productList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            key={item?.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
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
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 5,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontStyle: 'italic', marginBottom: 5 }}
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
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4CAF50',
                  paddingVertical: 6,
                  paddingHorizontal: 5,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
                onPress={() => {
                  setİsDetailModal(item);
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 12, textAlign: 'center' }}
                >
                  Detaylı Ekim Takvimi Gör
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 4,
                  gap: 4,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#4c56afff',
                    paddingVertical: 6,
                    paddingHorizontal: 5,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                  onPress={() => {}}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      textAlign: 'center',
                    }}
                  >
                    Alarm Kur
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#af4c4cff',
                    paddingVertical: 6,
                    paddingHorizontal: 5,
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setİsDeleteModal(item?.id);
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                    }}
                  >
                    Sil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
          onClose={() => setİsDeleteModal(null)}
          name={
            productList?.find((e: any) => e?.id === isDeleteModal)?.productId
              ?.productNameTr
          }
          id={isDeleteModal}
        />
      )}
    </>
  );
}
