import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, SlideInDown,
  useSharedValue, useAnimatedStyle,
  withTiming,  withSpring
} from 'react-native-reanimated';
import { BalanceCard } from '@/components/BalanceCard';
import { RecentTransactions } from '@/components/RecentTransactions';
import { CategoryPieChart } from '@/components/CategoryPieChart';
import { AddTransactionButton } from '@/components/AddTransactionButton';
import { TransactionForm } from '@/components/TransactionForm';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { useTheme } from '@/store/themeStore';
import { Settings } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { User } from '@/types';

export default function HomeScreen() {
  const { t } = useTranslation();

  const { colors, isDark } = useTheme();

  const { getUser } = useAppStore();
  const user: User | undefined = getUser();

  const router = useRouter();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  
  const handleAddTransaction = () => {
    setIsAddModalVisible(true);
  };
  
  const handleTransactionSubmit = () => {
    setIsAddModalVisible(false);
  };
  
  const handleCancel = () => {
    setIsAddModalVisible(false);
  };

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(0.8);

  useFocusEffect(
    useCallback(() => {
      // Réinitialise les valeurs
      opacity.value = 0;
      translateY.value = 20;
      scale.value = 0.8;

      // Lance l’animation
      opacity.value = withTiming(1, { duration: 800 });
      translateY.value = withTiming(0, { duration: 800 });
      scale.value = withSpring(1, { damping: 8 });

      // Optionnel : nettoyage
      return () => {
        // Si tu veux réinitialiser à chaque sortie, sinon retire
        opacity.value = 0;
        translateY.value = 20;
        scale.value = 0.8;
      };
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  
  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <ScrollView>
        <Animated.View
          style={[styles.header/*, animatedHeaderStyle*/]}
        >
          <View>
            <Text style={[styles.welcomeText, { color: colors.sectionTitle }]}>{t('home.welcome') + (user ? ' ' + user?.name : '')}! </Text>
            <Text style={[styles.titleText, { color: colors.titleText }]}>{t('home.headText')}</Text>
          </View>
          <Pressable onPress={() => router.push('/settings')}>
            {isDark ? <Settings size='30' color='#fff' /> : <Settings size='30' color='#000' />}
          </Pressable>
        </Animated.View>
        
        <Animated.View
          style={ animatedStyle}
        >
          <BalanceCard />
        </Animated.View>
        
        <Animated.View
          style={ animatedStyle}
        >
          <CategoryPieChart />
        </Animated.View>
        
        <Animated.View
          style={ animatedStyle}
        >
          <RecentTransactions navigation={router} />
        </Animated.View>
      </ScrollView>
      
      <AddTransactionButton onPress={handleAddTransaction} />
      
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.modalTitle, { color: colors.titleText, borderBottomColor: colors.border }]}>{t('home.add')}</Text>
          <TransactionForm 
            onSubmit={handleTransactionSubmit}
            onCancel={handleCancel}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#525252',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#262626',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#262626',
    textAlign: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
});