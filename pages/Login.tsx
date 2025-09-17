import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../style/Style';
import { tAxios } from '../call_config';
import { RestManagerApiList } from '../call_config/api-list/RestManagerApiList';
import { saveTokens } from '../utils/SecureStorage';
import { RootStackParamList } from '../AppNavigator';
import { useUser } from '../utils/UserContext';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login({
  navigation,
  setIsLoggedIn,
}: {
  navigation: LoginNavigationProp;
  setIsLoggedIn: any;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {  setUserInfo } = useUser();

  const handleLogin = () => {
    tAxios
      .call({
        api: RestManagerApiList.LOGIN,
        body: {
          email: email,
          password: password,
        },
      })
      .then((res: any) => {
        setIsLoggedIn(true);
        saveTokens(res).then((type: any) => {
          navigation.replace('Aylar');
          setUserInfo({
            email: '',
            id: '',
            name: '',
            password: '',
            surname: '',
            userName: '',
          });
        });
      });
  };

  return (
    <View style={styles.logincontainer}>
      <View style={styles.logocontainer}>
        <Image source={require('../assets/main.png')} style={styles.logo} />
      </View>
      <Text style={styles.logintitle}>Ne Ekilir?</Text>
      <TextInput
        placeholder="E-posta"
        style={styles.logininput}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Şifre"
        style={styles.logininput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginbutton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginbuttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}
