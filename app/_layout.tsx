import React from 'react';
// import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/store/themeStore';
import { useAppStore } from '@/store/appStore';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toastable from 'react-native-toastable';

function RootNavigatorWithToast() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const { getUser } = useAppStore();
  useFrameworkReady();
  const { top } = useSafeAreaInsets();

  const user = getUser();

  if (!user) {
    return (
      <View style={{ flex: 1 }}>
        <OnboardingScreen />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <RootNavigatorWithToast />
      <Toastable offset={top + 8} containerStyle={{ alignItems: 'flex-end', marginTop: 16, marginLeft: 16, zIndex: 9999 }} />
    </SafeAreaProvider>
  );
}