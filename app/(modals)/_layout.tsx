import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Stack } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{ 
      headerTintColor: Colors[colorScheme ?? 'light'].tint,headerShown: true, headerBackButtonMenuEnabled : true, headerShadowVisible : false,
      headerTitleStyle: { // Ajouter le style ici
        fontSize: 20, // Exemple de taille de police
        fontWeight: 'bold', // Exemple de poids de police
        color: Colors[colorScheme ?? 'light'].text, // Couleur du texte
      }, 
    }}></Stack>
  );
}
