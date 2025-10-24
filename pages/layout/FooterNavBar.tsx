import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from '@react-native-community/blur';

// Navigasyon prop'unun tipini tanımlayalım
type NavigationFunction = (route: string) => void;

interface BottomNavBarProps {
  activeRoute: 'Ay Seçimi' | 'Bitki Listem' | 'Profilim' | string;
  navigation: any;
  useBlur?: boolean; // opsiyonel: blur efekti eklensin mi?
}

interface NavItemProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  iconName: string;
}

const baseColors = {
  primary: '#17cf17',
  backgroundLight: '#f6f8f6',
  slate200: '#e2e8f0',
  slate500: '#64748b',
};

// --- Navigasyon Öğesi ---
const NavItem: React.FC<NavItemProps> = ({
  label,
  isActive,
  onPress,
  iconName,
}) => {
  const color: string = isActive ? baseColors.primary : baseColors.slate500;
  const fontWeight: '500' | '600' = isActive ? '600' : '500';

  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.navIconWrapper}>
        <Icon name={iconName} size={18} color={color} />
      </View>
      <Text style={[styles.navText, { color, fontWeight }]}>{label}</Text>
    </TouchableOpacity>
  );
};

// --- Ana Bileşen ---
const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeRoute,
  navigation,
  useBlur = false,
}) => {
  return (
    <View style={styles.wrapper}>
      {useBlur ? (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={Platform.OS === 'ios' ? 'light' : 'light'}
          blurAmount={15}
          reducedTransparencyFallbackColor="white"
        />
      ) : null}

      <View style={styles.containerCard}>
        <View style={styles.contentWrapper}>
          <NavItem
            iconName="cubes"
            label="Ay Seçimi"
            isActive={activeRoute === 'Aylar'}
            onPress={() => navigation.navigate('Aylar')}
          />

          <NavItem
            iconName="leaf"
            label="Bitki Listem"
            isActive={activeRoute === 'BitkiListesi'}
            onPress={() => navigation.navigate('BitkiListesi')}
          />

          <NavItem
            iconName="user"
            label="Profil"
            isActive={activeRoute === 'Profil'}
            onPress={() => navigation.navigate('Profil')}
          />
        </View>
      </View>
    </View>
  );
};

// --- Stiller ---
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: '#ffffffc4', // Arka plan gerçekten şeffaf
  },
  containerCard: {
    backgroundColor: 'transparent',
    borderTopColor: baseColors.slate200,
    width: '100%',
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: Platform.OS === 'ios' ? 6 : 4,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    paddingVertical: 4,
  },
  navIconWrapper: {
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default BottomNavBar;
