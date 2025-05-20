import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
      isDark: false,
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Hook personnalisé pour gérer le thème
export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const { mode, setMode, isDark } = useThemeStore();

  React.useEffect(() => {
    if (mode === 'system') {
      useThemeStore.setState({ isDark: systemColorScheme === 'dark' });
    } else {
      useThemeStore.setState({ isDark: mode === 'dark' });
    }
  }, [mode, systemColorScheme]);

  return {
    mode,
    setMode,
    isDark,
    colors: isDark ? darkColors : lightColors,
  };
};

// Couleurs pour le mode clair
export const lightColors = {
  primary: '#6366f1',
  background: '#f5f5f5',
  b_background: '#fafafa',
  card: '#ffffff',
  text: '#000000',
  textSecondary: '#525252',
  sectionTitle: '#040404',
  titleText: '#62626',
  settingDescription: '#737373',
  border: '#e5e5e5',
  notification: '#ff3b30',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  info: '#3b82f6',
  shadow: '#000000',
  // Couleurs spécifiques pour les composants
  button: {
    primary: '#6366f1',
    secondary: '#f5f5f5',
    text: '#ffffff',
    textSecondary: '#525252',
  },
  input: {
    background: '#ffffff',
    border: '#e5e5e5',
    text: '#000000',
    placeholder: '#a3a3a3',
  },
  modal: {
    background: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
};

// Couleurs pour le mode sombre
export const darkColors = {
  primary: '#818cf8',
  background: '#1a1a1a',
  b_background: '#151515',
  card: '#2a2a2a',
  text: '#ffffff',
  textSecondary: '#e5e5e5',
  sectionTitle: '#f5f5f5',
  titleText: '#fdfdfd',
  settingDescription: '#a3a3a3',
  border: '#404040',
  notification: '#ff453a',
  error: '#f87171',
  success: '#4ade80',
  warning: '#fbbf24',
  info: '#60a5fa',
  shadow: '#000000',
  // Couleurs spécifiques pour les composants
  button: {
    primary: '#818cf8',
    secondary: '#404040',
    text: '#ffffff',
    textSecondary: '#e5e5e5',
  },
  input: {
    background: '#2a2a2a',
    border: '#404040',
    text: '#ffffff',
    placeholder: '#737373',
  },
  modal: {
    background: '#2a2a2a',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
}; 