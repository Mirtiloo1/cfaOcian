import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  showLogo?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPressIcon?: () => void;
}

export function Header({ title, iconName, showLogo, onPressIcon, icon }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.leftContent}>
        {showLogo && (
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoContainer}
          >
            <Image 
              source={require('@/assets/images/SóPreto.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </LinearGradient>
        )} 
        {icon && (
          <TouchableOpacity onPress={onPressIcon} activeOpacity={0.6}>
            <MaterialCommunityIcons name={icon} size={44} color={colors.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {iconName && (
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7} onPress={onPressIcon}>
          <MaterialCommunityIcons name={iconName} size={24} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: colors.background,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontFamily: 'Creato-Bold',
    fontSize: 20,
    color: '#FFF',
    textTransform: 'uppercase',
  },
  actionButton: {
    width: 45,
    height: 45,
    backgroundColor: '#333',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});