import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { tAxios } from '../call_config';

type ProfileRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile({ route }: { route: ProfileRouteProp }) {
  const [productList, setProductList] = useState<any>();
  const userId = 2;

  const getProductList = (userId: any) => {
    tAxios
      .call({
        api: RestManagerApiList.GET_PROFILE_PRODUCT,
        pathVariable: { user_Id: userId },
      })
      .then((res: any) => {
        setProductList(res);
      });
  };

  useEffect(() => {
    if (userId) {
      getProductList(userId);
    }
  }, [userId]);
console.log(productList)
  return (
    <>
      <View
        style={{
          backgroundColor: '#ccc',
          marginVertical: 10,
        }}
      />
      <FlatList
        data={productList}
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
              {item?.product?.productNameTr}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 10, color: '#999' }}>
                {item.plantingDate &&
                  format(new Date(item.plantingDate), 'dd.MM.yyyy HH:mm')}
              </Text>
            </View>
          </View>
        )}
      />
    </>
  );
}
