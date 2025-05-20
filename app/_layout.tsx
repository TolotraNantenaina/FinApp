import React from 'react';
// import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/store/themeStore';

export default function RootLayout() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  useFrameworkReady();

  return (
    <>
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