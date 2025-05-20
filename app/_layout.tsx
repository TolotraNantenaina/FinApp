import React from 'react';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/LanguageSelector';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  const { t } = useTranslation();
  useFrameworkReady();

  return (
    <>
      <View style={styles.Right}>
        <LanguageSelector />
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};
const styles = StyleSheet.create({
  Right : { position: 'absolute', right: 16, top: 16, zIndex: 1000 }
});