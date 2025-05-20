import React from 'react';
// import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/store/themeStore';
// import { LanguageSelector } from '@/components/LanguageSelector';
// import { CurrencySelector } from '@/components/CurrencySelector';
// import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  useFrameworkReady();

  return (
    <>
      {/* <View style={styles.Right}>
        <CurrencySelector />
        <LanguageSelector />
      </View> */}
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
};
// const styles = StyleSheet.create({
//   Right :  {
//     position: 'absolute',
//     right: 16,
//     top: 16,
//     zIndex: 1000,
//     flexDirection: 'row',
//     gap: 8
//   }
// });