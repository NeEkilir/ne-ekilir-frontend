import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns - 20;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Aylar'
>;

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    tAxios
      .call({ api: RestManagerApiList.GET_MONTH_LIST })
      .then((res: any) => {
        setMonths(res);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={months}
        numColumns={numColumns}
        keyExtractor={(item: any) => item}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={(item: any) => {
          console.log(item);
          return (
            <TouchableOpacity
              style={{
                padding: 15,
                marginVertical: 8,
                backgroundColor: '#ddd',
                borderRadius: 8,
                width: itemWidth,
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('Detay', { monthId: item?.item?.id })
              }
            >
              <Text style={{ fontSize: 18 }}>{item?.item?.monthNameTr}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
