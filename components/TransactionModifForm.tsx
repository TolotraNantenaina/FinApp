import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/store/themeStore';
import { useTranslation } from 'react-i18next';
import { TransactionType } from '@/types';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react-native';
import { format } from 'date-fns';

interface TransactionModifFormProps {
  transactionId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function TransactionModifForm({ transactionId, onSubmit, onCancel }: TransactionModifFormProps) {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const { getTransactionById, updateTransaction, categories, formatAmount } = useAppStore();

  const [form, setForm] = useState({
    amount: '',
    date: '',
    categoryId: '',
    description: '',
    type: 'expense' as TransactionType,
  });

  useEffect(() => {
    if (transactionId) {
      const transaction = getTransactionById(transactionId);
      if (transaction) {
        setForm({
          amount: transaction.amount.toString(),
          date: format(new Date(transaction.date), 'yyyy-MM-dd'),
          categoryId: transaction.categoryId,
          description: transaction.description || '',
          type: transaction.type,
        });
      }
    }
  }, [transactionId]);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.amount || parseFloat(form.amount) <= 0 || isNaN(parseFloat(form.amount))) {
      return;
    }

    updateTransaction(transactionId, {
      amount: parseFloat(form.amount),
      date: new Date(form.date),
      categoryId: form.categoryId,
      description: form.description,
      type: form.type,
    });
    onSubmit();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.card }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.typeSelector}>
          <Pressable
            style={[styles.typeButton, form.type === 'expense' && styles.activeTypeButton]}
            onPress={() => handleChange('type', 'expense')}
          >
            <ArrowDownCircle
              size={20}
              color={form.type === 'expense' ? '#fff' : colors.settingDescription}
            />
            <Text style={[styles.typeButtonText, form.type === 'expense' && styles.activeTypeButtonText]}>
              Expense
            </Text>
          </Pressable>

          <Pressable
            style={[styles.typeButton, form.type === 'income' && styles.activeIncomeButton]}
            onPress={() => handleChange('type', 'income')}
          >
            <ArrowUpCircle
              size={20}
              color={form.type === 'income' ? '#fff' : colors.settingDescription}
            />
            <Text style={[styles.typeButtonText, form.type === 'income' && styles.activeTypeButtonText]}>
              Income
            </Text>
          </Pressable>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.sectionTitle }]}>Montant</Text>
          <View style={[styles.amountContainer, { borderColor: colors.border }]}>
            <Text style={[styles.currencySymbol, { color: colors.input.text }]}>{formatAmount(0).replace(/[\d,.]/g, '')}</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.input.text }]}
              keyboardType="numeric"
              value={form.amount}
              onChangeText={text => handleChange('amount', text.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              placeholderTextColor={colors.settingDescription}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.sectionTitle }]}>Catégorie</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category: any) => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryButton,
                  { backgroundColor: colors.background, borderColor: colors.border },
                  form.categoryId === category.id && { backgroundColor: category.color + '20', borderColor: category.color }
                ]}
                onPress={() => handleChange('categoryId', category.id)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  { color: colors.settingDescription },
                  form.categoryId === category.id && { color: category.color }
                ]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.sectionTitle }]}>Date</Text>
          <TextInput
            style={[styles.input, { color: colors.input.text, borderColor: colors.border }]}
            value={form.date}
            onChangeText={text => handleChange('date', text)}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor={colors.settingDescription}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.sectionTitle }]}>Description</Text>
          <TextInput
            style={[styles.input, { color: colors.input.text, borderColor: colors.border }]}
            value={form.description}
            onChangeText={text => handleChange('description', text)}
            placeholder="Description"
            placeholderTextColor={colors.settingDescription}
            multiline
          />
        </View>

      </ScrollView>

      <View style={[styles.buttonContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={[styles.cancelButtonText, { color: colors.settingDescription }]}>{t('detail.cancel') || 'Annuler'}</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSubmit}>
          <Text style={[styles.saveButtonText, { color: colors.button.text }]}>{t('detail.save') || 'Enregistrer'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingVertical: 24,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    flex: 1,
    marginHorizontal: 6,
  },
  typeButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#737373',
  },
  activeTypeButton: {
    backgroundColor: '#ef4444',
  },
  activeIncomeButton: {
    backgroundColor: '#22c55e',
  },
  activeTypeButtonText: {
    color: '#fff',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#525252',
    marginBottom: 8,
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 24,
    color: '#525252',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    paddingVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingTop: 7,
    paddingBottom: 9,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#f5f5f5',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#525252',
  },
  dateText: {
    fontSize: 16,
    color: '#262626',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  cancelButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#525252',
  },
  saveButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
}); 