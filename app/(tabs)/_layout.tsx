import React from 'react';
import { Tabs } from 'expo-router';
import { Home, BarChart3, Clock, Settings } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { useTheme } from '@/store/themeStore';

export default function TabLayout() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary/*'#6366f1'*/,
        tabBarInactiveTintColor: colors.button.textSecondary/*'#737373'*/,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border/*'#f5f5f5'*/,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.card
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('menu.home'),
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: t('menu.statistics'),
          tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: t('menu.transactions'),
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('menu.settings'),
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}