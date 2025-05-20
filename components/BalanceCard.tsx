import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useTheme } from '@/store/themeStore';

export const BalanceCard = () => {
  const { t } = useTranslation();

  const { colors, isDark } = useTheme();

  const { formatAmount, getCurrentBalance, getMonthlyTotals } = useAppStore();

  const currentBalance = getCurrentBalance();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const { income, expense } = getMonthlyTotals(currentMonth, currentYear);

  return (
    <View style={[styles.container, {backgroundColor: colors.card, shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: isDark ? 4 : 2 }, shadowOpacity: isDark ? 1 : 0.1, shadowRadius: isDark ? 9 : 8 }]}>
      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceLabel, { color: colors.settingDescription}]}>{t('balance.balance')}</Text>
        <Text style={[styles.balanceAmount, { color: currentBalance >= 0 ? '#16a34a' : '#dc2626' }]}>
        {formatAmount(0).replace(/[\d,.]/g, '')}{currentBalance.toFixed(2)}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <ArrowUpCircle color="#16a34a" size={24} />
          </View>
          <View>
            <Text style={[styles.statLabel, { color: colors.settingDescription}]}>{t('balance.income')}</Text>
            <Text style={[styles.statValue, { color: colors.sectionTitle}]}>{formatAmount(0).replace(/[\d,.]/g, '')}{income.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <ArrowDownCircle color="#dc2626" size={24} />
          </View>
          <View>
            <Text style={[styles.statLabel, { color: colors.settingDescription}]}>{t('balance.expense')}</Text>
            <Text style={[styles.statValue, { color: colors.sectionTitle}]}>{formatAmount(0).replace(/[\d,.]/g, '')}{expense.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceContainer: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#737373',
    marginBottom: 8,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    marginRight: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#737373',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  divider: {
    width: 1,
    backgroundColor: '#e5e5e5',
    marginHorizontal: 16,
  },
});