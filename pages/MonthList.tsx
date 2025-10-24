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
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import styles from '../style/Style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../utils/UserContext';
import { LogoutModal } from './modal/LogoutModal';
import { RootStackParamList } from '../AppNavigator';
import { SearchProductModal } from './modal/SearchProductModal';
import BottomNavBar from './layout/FooterNavBar';

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
  const [isSearchModal, setIsSearchModal] = useState<any>();

  const { userInfo, setUserInfo } = useUser();

  useEffect(() => {
    if (!userInfo?.id) {
      tAxios.call({ api: RestManagerApiList.USER_INFO }).then((res: any) => {
        setUserInfo(res);
      });
    }
  }, [userInfo]);

  useEffect(() => {
    tAxios
      .call({ api: RestManagerApiList.GET_DAILY_PLANTING })
      .then((res: any) => setDailyPlanting(res));
  }, []);

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerTitle: 'Hangi Ayda Ne Ekilir?',
        headerTitleAlign: 'left',
        headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
          ></TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              setIsSearchModal(true);
            }}
            style={{
              backgroundColor: styles.title.color,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <Icon name={'search'} color={styles.monthCard.backgroundColor} />
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {months.map((month: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={{ ...styles.monthCard, width: itemWidth }}
              onPress={() =>
                navigation.navigate('Detay', { monthId: month?.id })
              }
            >
              <Text style={styles.monthText}>{month?.monthNameTr}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {dailyPlanting && (
          <View style={styles.suggestionCard}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={styles.suggestionTitle}>🌿 Bugün İçin Öneri</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Top10');
                  }}
                  style={{
                    backgroundColor: styles.title.color,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                  }}
                >
                  <Icon
                    name={'star'}
                    color={styles.monthCard.backgroundColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.suggestionText2}>{dailyPlanting}</Text>
          </View>
        )}
        {isSearchModal && (
          <SearchProductModal
            show={isSearchModal}
            onClose={() => setIsSearchModal(false)}
          />
        )}
      </ScrollView>
      <BottomNavBar activeRoute="Aylar" navigation={navigation} />
    </SafeAreaView>
  );
}
