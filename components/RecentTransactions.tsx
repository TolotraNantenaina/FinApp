import  * as React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { format } from 'date-fns';
import { Transaction, Category } from '@/types';
import { useAppStore } from '@/store/appStore';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useTheme } from '@/store/themeStore';

interface TransactionItemProps {
  transaction: Transaction;
  category: Category | undefined;
  onPress: (transaction: Transaction) => void;
  formatAmount: (number: number) => string;
}

const TransactionItem = ({ transaction, category, onPress, formatAmount }: TransactionItemProps) => {
  const { colors } = useTheme();

  return (
    <Pressable 
      style={[styles.transactionItem, { borderBottomColor: colors.border }]}
      onPress={() => onPress(transaction)}
    >
      <View style={[styles.iconContainer, { backgroundColor: category?.color || '#e5e5e5' }]}>
        {transaction.type === 'income' ? (
          <ArrowUpRight color="#fff" size={18} />
        ) : (
          <ArrowDownLeft color="#fff" size={18} />
        )}
      </View>
      
      <View style={styles.transactionInfo}>
        <Text style={[styles.transactionName, { color: colors.text}]}>{category?.name || 'Uncategorized'}</Text>
        <Text style={styles.transactionDate}>
          {format(new Date(transaction.date), 'dd MMM yyyy')}
        </Text>
      </View>
      
      <Text style={[
        styles.transactionAmount,
        { color: transaction.type === 'income' ? '#16a34a' : '#dc2626' }
      ]}>
        {transaction.type === 'income' ? '+' : '-'}{formatAmount(0).replace(/[\d,.]/g, '')}{transaction.amount ? transaction.amount.toFixed(2) : Number('0').toFixed(2)}
      </Text>
    </Pressable>
  );
};

export const RecentTransactions = ({ navigation }: { navigation: any }) => {
  const { transactions, categories, formatAmount } = useAppStore();
  
  // Sort transactions by date, most recent first
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // Get only the 5 most recent transactions
  
  const handleTransactionPress = (transaction: Transaction) => {
    // Navigate to transaction details when implemented
    navigation.navigate({pathname: '/TransactionDetails',
      params: { transactionId: transaction.id, transaction: JSON.stringify(transaction) }});
  };
  
  const getCategoryById = (categoryId: string) => {
    return categories.find((category:any) => category.id === categoryId);
  };
  
  const { t } = useTranslation();

  const { colors } = useTheme();

  if (transactions.length === 0) {
    return (
      <View style={[styles.container, {backgroundColor: colors.card}]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.titleText}]}>{t('home.transaction')}</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: colors.sectionTitle}]}>No transactions yet</Text>
          <Text style={[styles.emptyStateSubtext, { color: colors.settingDescription}]}>
            Add your first transaction by tapping the + button below
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.titleText}]}>{t('home.transaction')}</Text>
        <Pressable onPress={() => navigation.navigate('transactions')}>
          <Text style={[styles.viewAll, { color: colors.settingDescription}]}>{t('home.all')}</Text>
        </Pressable>
      </View>
      
      <FlatList
        data={sortedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem 
            transaction={item} 
            category={getCategoryById(item.categoryId)}
            onPress={handleTransactionPress}
            formatAmount={formatAmount}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  viewAll: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
    paddingRight: 8,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#262626',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#737373',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});