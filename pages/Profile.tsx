import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUser } from '../utils/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/Style';
import { RootStackParamList } from '../AppNavigator';
import { LogoutModal } from './modal/LogoutModal';
import BottomNavBar from './layout/FooterNavBar';

type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profil'>;

export default function Profile({
  navigation,
}: {
  navigation: ProfileNavigationProp;
}) {
  const { userInfo, setUserInfo } = useUser();
  const [isLogout, setIsLogout] = useState<any>();

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerTitle: 'Profil',
        headerTitleAlign: 'left',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              setIsLogout(true);
            }}
            style={{
              backgroundColor: styles.profilelogoutButton.backgroundColor,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <Icon name={'sign-out'} color={styles.monthCard.backgroundColor} />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation]);

  return (
    <>
      <View style={styles.profilecard}>
        <View style={styles.profileavatarContainer}>
          <Icon name={'user'} size={60} color="#666" />
        </View>

        <View style={styles.profileinfoContainer}>
          <Text style={styles.profilename}>
            {userInfo?.name + ' ' + userInfo?.surname}
          </Text>
          <Text style={styles.profileusername}>{'@' + userInfo?.userName}</Text>
          <Text style={styles.profileemail}>{userInfo?.email}</Text>
        </View>
      </View>
      {isLogout && (
        <LogoutModal show={isLogout} onClose={() => setIsLogout(false)} />
      )}
      <BottomNavBar activeRoute="Profil" navigation={navigation} />
    </>
  );
}
