import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type TopTenListRouteProp = RouteProp<RootStackParamList, 'Top 10'>;
type TopTenListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Top 10'
>;

export default function TopTenList({ route }: { route: TopTenListRouteProp }) {
  const [topTenProducts, setTopTenProducts] = useState<any[]>([]);

  useEffect(() => {
    tAxios
      .call({
        api: RestManagerApiList.TOP_TEN_LIST,
      })
      .then((res: any) => setTopTenProducts(res));
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>
        🔥 En Popüler 10 Ürün
      </Text>

      <FlatList
        data={topTenProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                width: 30,
                color: index + 1 === 1 ? 'green' : '',
              }}
            >
              {index + 1}.
            </Text>
            <Text
              style={{ fontSize: 18, color: index + 1 === 1 ? 'green' : '' }}
            >
              <Text>
                <Text>{item?.productName + ' | '}</Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {item?.avgRate}
                </Text>
              </Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
}
