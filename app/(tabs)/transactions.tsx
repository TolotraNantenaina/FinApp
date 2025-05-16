import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { format } from 'date-fns';
import { Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { Transaction, Category, TransactionType } from '@/types';
import { AddTransactionButton } from '@/components/AddTransactionButton';
import { TransactionForm } from '@/components/TransactionForm';

interface TransactionItemProps {
  transaction: Transaction;
  category: Category | undefined;
}

const TransactionItem = ({ transaction, category }: TransactionItemProps) => {
  return (
    <TouchableOpacity style={styles.transactionItem}>
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
        {transaction.description && (
          <Text style={styles.transactionDescription} numberOfLines={1}>
            {transaction.description}
          </Text>
        )}
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

export default function TransactionsScreen() {
  const { transactions, categories } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<TransactionType | 'all'>('all');
  
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Sort transactions by date, most recent first
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const filteredTransactions = 
    activeFilter === 'all' 
      ? sortedTransactions 
      : sortedTransactions.filter(t => t.type === activeFilter);
      
  const getCategoryById = (categoryId: string) => {
    return categories.find(category => category.id === categoryId);
  };
  
  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> = {};
  
  filteredTransactions.forEach(transaction => {
    const dateKey = format(new Date(transaction.date), 'yyyy-MM-dd');
    if (!groupedTransactions[dateKey]) {
      groupedTransactions[dateKey] = [];
    }
    groupedTransactions[dateKey].push(transaction);
  });
  
  // Convert grouped transactions to array for FlatList
  const sections = Object.keys(groupedTransactions).map(date => ({
    date,
    data: groupedTransactions[date],
  }));
  
  const renderSectionHeader = (date: string) => {
    const transactionDate = new Date(date);
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          {format(transactionDate, 'EEEE, MMMM d, yyyy')}
        </Text>
      </View>
    );
  };
  
  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionItem 
      transaction={item}
      category={getCategoryById(item.categoryId)}
    />
  );

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
      
      <View style={styles.header}>
        <Text style={styles.titleText}>Transactions</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#737373" />
            <Text style={styles.searchPlaceholder}>Search transactions</Text>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#525252" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[
              styles.filterTab,
              activeFilter === 'all' && styles.activeFilterTab,
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[
              styles.filterTabText,
              activeFilter === 'all' && styles.activeFilterText,
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterTab,
              activeFilter === 'expense' && styles.activeExpenseTab,
            ]}
            onPress={() => setActiveFilter('expense')}
          >
            <Text style={[
              styles.filterTabText,
              activeFilter === 'expense' && styles.activeFilterText,
            ]}>
              Expenses
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterTab,
              activeFilter === 'income' && styles.activeIncomeTab,
            ]}
            onPress={() => setActiveFilter('income')}
          >
            <Text style={[
              styles.filterTabText,
              activeFilter === 'income' && styles.activeFilterText,
            ]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No transactions yet</Text>
          <Text style={styles.emptyText}>
            Add your first transaction by tapping the + button below
          </Text>
        </View>
      ) : filteredTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No {activeFilter} transactions</Text>
          <Text style={styles.emptyText}>
            Try changing the filter or add a new transaction
          </Text>
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <>
              {renderSectionHeader(item.date)}
              {item.data.map((transaction) => (
                <View key={transaction.id}>
                  {renderItem({ item: transaction })}
                </View>
              ))}
            </>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      <AddTransactionButton onPress={handleAddTransaction} />

      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Transaction</Text>
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
    paddingVertical: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#a3a3a3',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeFilterTab: {
    backgroundColor: '#6366f1',
  },
  activeExpenseTab: {
    backgroundColor: '#ef4444',
  },
  activeIncomeTab: {
    backgroundColor: '#22c55e',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#525252',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 80,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#525252',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
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
  transactionDescription: {
    fontSize: 14,
    color: '#525252',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#737373',
    textAlign: 'center',
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