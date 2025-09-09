import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SplashPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export default function SplashPage({
  navigation,
}: {
  navigation: SplashPageNavigationProp;
}) {
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerTitle: '',
      });
    }
  }, [navigation]);

  return <View style={{ display: 'flex', backgroundColor: 'white' }}></View>;
}
