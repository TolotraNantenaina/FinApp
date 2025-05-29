import  * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useTheme } from '@/store/themeStore';

const screenWidth = Dimensions.get('window').width;

export const CategoryPieChart = () => {
  const { t } = useTranslation();

  const { colors } = useTheme();

  const { getCategorySpending, categories } = useAppStore();
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const categorySpending = getCategorySpending(currentMonth, currentYear);
  
  const chartData = categorySpending.map((item:any) => {
    const category = categories.find((c:any) => c.id === item.categoryId);
    return {
      name: category?.name || 'Unknown',
      population: item.amount,
      color: category?.color || '#000',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    };
  });
  
  // If no data, show empty state
  if (chartData.length === 0) {
    return (
      <View style={[styles.container, {backgroundColor: colors.card}]}>
        <Text style={[styles.title, { color: colors.titleText}]}>{t('home.category')}</Text>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, {color: colors.settingDescription}]}>{t('home.no-data')}</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      <Text style={[styles.title, { color: colors.titleText}]}>{t('home.category')}</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={screenWidth - 64}
          height={180}
          chartConfig={{
            backgroundColor: colors.card/*'#fff'*/,
            backgroundGradientFrom: colors.card/*'#fff'*/,
            backgroundGradientTo: colors.card/*'#fff'*/,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForLabels: {
              fontFamily: 'roboto', // Ajout de la police de texte
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
      </View>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  emptyContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#737373',
    fontSize: 14,
  },
});