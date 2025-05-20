import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BalanceCard } from '@/components/BalanceCard';
import { RecentTransactions } from '@/components/RecentTransactions';
import { CategoryPieChart } from '@/components/CategoryPieChart';
import { AddTransactionButton } from '@/components/AddTransactionButton';
import { TransactionForm } from '@/components/TransactionForm';
import { useTranslation } from 'react-i18next';
import '../../i18n';

export default function HomeScreen() {
  const { t } = useTranslation();
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
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>{t('home.welcome')}, </Text>
            <Text style={styles.titleText}>{t('home.headText')}</Text>
          </View>
        </View>
        
        <BalanceCard />
        
        <CategoryPieChart />
        
        <RecentTransactions navigation={router} />
      </ScrollView>
      
      <AddTransactionButton onPress={handleAddTransaction} />
      
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t('home.add')}</Text>
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