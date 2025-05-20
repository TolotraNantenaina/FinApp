import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { format, subMonths, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const { t } = useTranslation();

  const [currentDate, setCurrentDate] = useState(new Date());
  const { getMonthlyTotals, getCategorySpending, categories } = useAppStore();
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const { income, expense, balance } = getMonthlyTotals(currentMonth, currentYear);
  const categorySpending = getCategorySpending(currentMonth, currentYear);
  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const isCurrentMonth = () => {
    const today = new Date();
    return (
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };
  
  // Generate 6 months data for the line chart
  const generateMonthsData = () => {
    const labels = [];
    const incomeData = [];
    const expenseData = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(currentDate, i);
      const month = date.getMonth();
      const year = date.getFullYear();
      
      labels.push(format(date, 'MMM'));
      
      const monthData = getMonthlyTotals(month, year);
      incomeData.push(monthData.income);
      expenseData.push(monthData.expense);
    }
    
    return {
      labels,
      datasets: [
        {
          data: incomeData,
          color: () => '#22c55e',
          strokeWidth: 2,
        },
        {
          data: expenseData,
          color: () => '#ef4444',
          strokeWidth: 2,
        },
      ],
      legend: ['Income', 'Expenses'],
    };
  };
  
  const spendingByCategory = categorySpending.map(item => {
    const category = categories.find(c => c.id === item.categoryId);
    return {
      id: item.categoryId,
      name: category?.name || 'Unknown',
      amount: item.amount,
      color: category?.color || '#000',
      percentage: Math.round((item.amount / expense) * 100) || 0,
    };
  }).sort((a, b) => b.amount - a.amount);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.titleText}>{t('statistics.statistics')}</Text>
        
        <View style={styles.monthSelector}>
          <Pressable 
            style={styles.monthButton} 
            onPress={handlePreviousMonth}
          >
            <ChevronLeft size={20} color="#525252" />
          </Pressable>
          
          <Text style={styles.monthText}>
            {format(currentDate, 'MMMM yyyy')}
          </Text>
          
          <Pressable 
            style={[
              styles.monthButton,
              isCurrentMonth() && styles.disabledButton
            ]} 
            onPress={handleNextMonth}
            disabled={isCurrentMonth()}
          >
            <ChevronRight size={20} color={isCurrentMonth() ? '#a3a3a3' : '#525252'} />
          </Pressable>
        </View>
      </View>
      
      <ScrollView>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t('balance.income')}</Text>
            <Text style={[styles.summaryValue, styles.incomeValue]}>
              €{income.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t('balance.expense')}</Text>
            <Text style={[styles.summaryValue, styles.expenseValue]}>
              €{expense.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t('statistic.balance')}</Text>
            <Text style={[
              styles.summaryValue,
              balance >= 0 ? styles.positiveBalance : styles.negativeBalance
            ]}>
              €{balance.toFixed(2)}
            </Text>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>{t('statistics.month')}</Text>
          <LineChart
            data={generateMonthsData()}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>{t('home.category')}</Text>
          
          {spendingByCategory.length === 0 ? (
            <Text style={styles.emptyText}>No expenses for this month</Text>
          ) : (
            spendingByCategory.map((category) => (
              <View key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryNameContainer}>
                    <View 
                      style={[styles.categoryColor, { backgroundColor: category.color }]} 
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
                </View>
                
                <View style={styles.categoryProgress}>
                  <View 
                    style={[
                      styles.categoryProgressFill,
                      { 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      }
                    ]} 
                  />
                </View>
                
                <Text style={styles.categoryAmount}>€{category.amount.toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
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
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  monthButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  incomeValue: {
    color: '#22c55e',
  },
  expenseValue: {
    color: '#ef4444',
  },
  positiveBalance: {
    color: '#22c55e',
  },
  negativeBalance: {
    color: '#ef4444',
  },
  divider: {
    width: 1,
    backgroundColor: '#e5e5e5',
    marginHorizontal: 16,
  },
  chartContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#525252',
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#525252',
  },
  categoryProgress: {
    height: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryAmount: {
    textAlign: 'right',
    fontSize: 14,
    color: '#525252',
  },
  emptyText: {
    textAlign: 'center',
    padding: 24,
    color: '#737373',
  },
});