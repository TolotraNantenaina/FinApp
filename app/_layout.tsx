import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assurez-vous d'installer cette bibliothèque
// import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

import { migrateDbIfNeeded } from '@/database/migration';

import { useColorScheme } from '@/components/useColorScheme';
import { connectToDatabase, isUserTableEmpty, isTransactionsTableEmpty } from '@/store/database';
import AddUserModal from '@/components/AddUser';
import ModalScreen from './(modals)/modal';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [isUserEmpty, setIsUserEmpty] = useState(true);
  const [isTransactionsEmpty, setIsTransactionsEmpty] = useState(true);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Initialisation de la base de données
  useEffect(() => {
    const initializeDatabase = async () => {
      const db = await connectToDatabase();
      await migrateDbIfNeeded(db); // Exécuter la migration
      const EmptyUser: boolean = await isUserTableEmpty();
      const EmptyTransaction: boolean = await isTransactionsTableEmpty();
      setIsUserEmpty(EmptyUser);
      setIsTransactionsEmpty(EmptyTransaction);
    };

    initializeDatabase();
  }, []);

  // Vérifiez les états avant de rendre
  if (!loaded) {
    return null;
  }

  if (isUserEmpty) {
    return <AddUserModal />;
  }

  if (isTransactionsEmpty) {
    return <ModalScreen />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const navigation = useNavigation(); // Récupérer l'objet de navigation
  const colorScheme = useColorScheme();
  const [buttonsVisible, setButtonsVisible] = useState(false); // État pour gérer la visibilité des boutons

  const toggleButtons = () => {
    setButtonsVisible(!buttonsVisible); // Inverser la visibilité
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        { false && (<TouchableOpacity style={styles.floatingButton} onPress={toggleButtons}>
          <AntDesign name={buttonsVisible ? "down" : "plus"} size={24} color="white" /> {/* Icône dynamique */}
        </TouchableOpacity>)}
        { buttonsVisible && ( // Afficher les boutons supplémentaires si visible}
          <>
            <TouchableOpacity style={[styles.additionalButton, styles.topButton]} onPress={() => {/* Action du bouton du haut */}}>
              <AntDesign style={[styles.topIcon]} name="login" size={24} color="white" /> {/* Icône du bouton du haut */}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.additionalButton, styles.leftButton]} onPress={() => {/* Action du bouton de droite */}}>
              <AntDesign style={[styles.leftIcon]} name="logout" size={24} color="white" /> {/* Icône du bouton de droite */}
            </TouchableOpacity>
          </>
        )}
      <Stack>
        {/* <SQLiteProvider databaseName="financeApp.db" onInit={migrateDbIfNeeded}> */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modals)" options={{ headerShown: false, presentation: 'modal' }} />
        {/* </SQLiteProvider> */}
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'blue', // Couleur de fond
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Ombre pour Android
    zIndex: 10, // Assurez-vous que le bouton est au-dessus des autres contenus
  },
  additionalButton: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 9,
  },
  topButton: {
    bottom: 84, // Positionnez le bouton en haut
    right: 16,
  },
  leftButton: {
    bottom: 16, // Positionnez le bouton à droite
    right: 84,
  },
  topIcon: {
    transform: [{ rotate: '90deg' }], // Utiliser 'transform' au lieu de 'rotate'
  },
  leftIcon: {
    transform: [{ rotate: '-90deg' }], // Utiliser 'transform' au lieu de 'rotate'
  }
});
