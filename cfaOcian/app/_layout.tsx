import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export const APP_FONTS = {
  'Creato-Bold': require('../assets/fonts/CreatoDisplay-Bold.otf'),
  'Creato-Light': require('../assets/fonts/CreatoDisplay-Light.otf'),
  'Creato-Medium': require('../assets/fonts/CreatoDisplay-Medium.otf'),
  'Creato-Regular': require('../assets/fonts/CreatoDisplay-Regular.otf'),
  'Decalotype-Black': require('../assets/fonts/Decalotype-Black.ttf'),
  'Decalotype-Bold': require('../assets/fonts/Decalotype-Bold.ttf'),
  'Decalotype-Light': require('../assets/fonts/Decalotype-Light.ttf'),
  'Decalotype-Medium': require('../assets/fonts/Decalotype-Medium.ttf'),
  'Decalotype-Regular': require('../assets/fonts/Decalotype-Regular.ttf'),
  'Morganite-Black': require('../assets/fonts/Morganite-Black.ttf'),
  'Morganite-Bold': require('../assets/fonts/Morganite-Bold.ttf'),
  'Morganite-Light': require('../assets/fonts/Morganite-Light.ttf'),
  'Morganite-Medium': require('../assets/fonts/Morganite-Medium.ttf'),
};

export type AppFontNames = keyof typeof APP_FONTS;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(APP_FONTS);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" /> 
    </Stack>
  );
}