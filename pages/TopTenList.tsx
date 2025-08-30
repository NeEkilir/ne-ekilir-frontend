import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';

type TopTenListRouteProp = RouteProp<RootStackParamList, 'Top 10'>;
type TopTenListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Top 10'
>;

export default function TopTenList({ route }: { route: TopTenListRouteProp }) {
  const [topTenProducts, setTopTenProducts] = useState<any[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    tAxios
      .call({
        api: RestManagerApiList.TOP_TEN_LIST,
      })
      .then((res: any) => setTopTenProducts(res));
  }, []);

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerTitle: '🔥 En Popüler 10 Ürün',
      });
    }
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
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
              style={{
                fontSize: 18,
                color:
                  index + 1 === 1
                    ? '#006600'
                    : index + 1 === 2
                    ? '#009900'
                    : index + 1 === 3
                    ? '#00CC00'
                    : '',
              }}
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
