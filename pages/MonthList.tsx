import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import styles from '../style/MonthListStyle'; // dosya yolunu ayarla
import Icon from 'react-native-vector-icons/FontAwesome';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns - 20;

type MonthListNavigationProp = StackNavigationProp<RootStackParamList, 'Aylar'>;

export default function MonthList({
  navigation,
}: {
  navigation: MonthListNavigationProp;
}) {
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dailyPlanting, setDailyPlanting] = useState<any>();

  useEffect(() => {
    tAxios
      .call({ api: RestManagerApiList.GET_DAILY_PLANTING })
      .then((res: any) => setDailyPlanting(res));
  }, []);

  console.log(dailyPlanting);
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerTitle: 'Hangi Ayda Ne Ekilir?',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Top 10');
            }}
            style={{
              backgroundColor: styles.title.color,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginLeft: 10,
            }}
          >
            <Icon name={'star'} color={styles.monthCard.backgroundColor} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}
            style={{
              backgroundColor: styles.title.color,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <Icon name={'user'} color={styles.monthCard.backgroundColor} />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {months.map((month: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={{ ...styles.monthCard, width: itemWidth }}
            onPress={() => navigation.navigate('Detay', { monthId: month?.id })}
          >
            <Text style={styles.monthText}>{month?.monthNameTr}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {dailyPlanting && (
        <View style={styles.suggestionCard}>
          <Text style={styles.suggestionTitle}>🌿 Bugün İçin Öneri</Text>
          <Text style={styles.suggestionText2}>{dailyPlanting}</Text>
        </View>
      )}
    </ScrollView>
  );
}
