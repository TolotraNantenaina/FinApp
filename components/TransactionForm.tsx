import * as React from 'react';
import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { format } from 'date-fns';
import { useAppStore } from '@/store/appStore';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react-native';
import { TransactionType } from '@/types';
import { useTheme } from '@/store/themeStore';

interface TransactionFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const TransactionForm = ({ onSubmit, onCancel }: TransactionFormProps) => {
  const { colors, isDark } = useTheme();
  const { addTransaction, categories, formatAmount } = useAppStore();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  
  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      // Handle validation error
      return;
    }
    
    addTransaction({
      amount: parseFloat(amount),
      description,
      type,
      categoryId,
      date: new Date(),
    });
    
    onSubmit();
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.card }]}
    >
      <ScrollView>
        <View style={styles.typeSelector}>
          <Pressable
            style={[
              styles.typeButton,
              type === 'expense' && styles.activeTypeButton
            ]}
            onPress={() => setType('expense')}
          >
            <ArrowDownCircle 
              size={20} 
              color={type === 'expense' ? '#fff' : '#737373'} 
            />
            <Text style={[
              styles.typeButtonText,
              type === 'expense' && styles.activeTypeButtonText
            ]}>
              Expense
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.typeButton,
              type === 'income' && styles.activeIncomeButton
            ]}
            onPress={() => setType('income')}
          >
            <ArrowUpCircle 
              size={20} 
              color={type === 'income' ? '#fff' : '#737373'} 
            />
            <Text style={[
              styles.typeButtonText,
              type === 'income' && styles.activeTypeButtonText
            ]}>
              Income
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.sectionTitle }]}>Amount</Text>
          <View style={[styles.amountContainer, { borderColor: colors.border }]}>
            <Text style={[styles.currencySymbol, { color: colors.input.text }]}>{formatAmount(0).replace(/[\d,.]/g, '')}</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.input.text }]}
              keyboardType="default"
              value={amount}
              onChangeText={(text) => {
                // On autorise uniquement les chiffres et le point
                const numericText = text.replace(/[^0-9.]/g, '');
                setAmount(numericText);
              }}
              placeholder="0.00"
            />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.sectionTitle }]}>Category</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category:any) => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryButton,
                  { backgroundColor: colors.background, borderColor: colors.border },
                  categoryId === category.id && { backgroundColor: category.color + '20', borderColor: category.color },
                ]}
                onPress={() => setCategoryId(category.id)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  { color: colors.settingDescription },
                  categoryId === category.id && { color: category.color }
                ]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.sectionTitle }]}>Description (Optional)</Text>
          <TextInput
            style={[styles.input, { color: colors.input.text, borderColor: colors.border }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Add a note"
            placeholderTextColor="#a3a3a3"
            multiline
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.sectionTitle }]}>Date</Text>
          <Text style={[styles.dateText, { color: colors.titleText, borderColor: colors.border }]}>{format(new Date(), 'EEEE, MMMM d, yyyy')}</Text>
        </View>
      </ScrollView>

      <View style={[styles.buttonContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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