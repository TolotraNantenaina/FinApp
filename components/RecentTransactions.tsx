import  * as React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Transaction, Category } from '@/types';
import { useAppStore } from '@/store/appStore';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

interface TransactionItemProps {
  transaction: Transaction;
  category: Category | undefined;
  onPress: (transaction: Transaction) => void;
}

const TransactionItem = ({ transaction, category, onPress }: TransactionItemProps) => {
  return (
    <TouchableOpacity 
      style={styles.transactionItem}
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
        <Text style={styles.transactionName}>{category?.name || 'Uncategorized'}</Text>
        <Text style={styles.transactionDate}>
          {format(new Date(transaction.date), 'dd MMM yyyy')}
        </Text>
      </View>
      
      <Text style={[
        styles.transactionAmount,
        { color: transaction.type === 'income' ? '#16a34a' : '#dc2626' }
      ]}>
        {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};

export const RecentTransactions = ({ navigation }: { navigation: any }) => {
  const { transactions, categories } = useAppStore();
  
  // Sort transactions by date, most recent first
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // Get only the 5 most recent transactions
  
  const handleTransactionPress = (transaction: Transaction) => {
    // Navigate to transaction details when implemented
    navigation.navigate('TransactionDetails', { transactionId: transaction.id });
  };
  
  const getCategoryById = (categoryId: string) => {
    return categories.find((category:any) => category.id === categoryId);
  };
  
  if (transactions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Recent Transactions</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No transactions yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Add your first transaction by tapping the + button below
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('transactions')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={sortedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem 
            transaction={item} 
            category={getCategoryById(item.categoryId)}
            onPress={handleTransactionPress}
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
    fontSize: 14,
    fontWeight: '500',
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