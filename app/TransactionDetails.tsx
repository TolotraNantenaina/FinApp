import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '@/store/themeStore';
import { ChevronLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/appStore';
import { format } from 'date-fns';
import TransactionModifForm from '@/components/TransactionModifForm';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

// Définition du type pour les paramètres de la route
interface Transaction {
  name: string;
  amount: number;
  date: string;
  categoryId: string;
  description: string;
  type: 'income' | 'expense'; // Ajout du type de transaction
}

type RouteParams = {
  transactionId?: string,
  transaction?: string;
};

export default function TransactionDetails() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { formatAmount, categories, getTransactionById } = useAppStore(); // Import de categories et getTransactionById
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();

  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const transactionId : string = route.params?.transactionId || '';
  const transaction: Transaction = route.params?.transaction ? JSON.parse(route.params?.transaction) : {
    name: 'Achat Supermarché',
    amount: 42.50,
    date: '2024-06-01',
    categoryId: 'Alimentation',
    description: 'Courses du samedi',
    type: 'expense', // Valeur par défaut
  };

  // Récupérer les données de la transaction si seulement l'id est passé
  useEffect(() => {
    if (transactionId && !route.params?.transaction) {
      const fetchedTransaction = getTransactionById(transactionId);
      if (fetchedTransaction) {
        // Mettre à jour l'état local ou utiliser les données directement
        // Pour l'instant, nous utilisons les données passées ou par défaut,
        // cette partie pourrait être affinée si nécessaire pour fetcher.
      }
    }
  }, [transactionId, route.params?.transaction]);

  const handleEdit = () => setEditModalVisible(true);
  const handleEditCancel = () => setEditModalVisible(false);
  const handleEditSubmit = () => setEditModalVisible(false); // à adapter selon le besoin

  const transactionCategory = categories.find(cat => cat.id === transaction.categoryId);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={25} color={ colors.button.textSecondary } />
        </Pressable>
        <Text style={[styles.title, { color: colors.titleText }]}>Détails de la transaction</Text>
        {/* <Pressable onPress={handleEdit} style={styles.editButton}>
          <Text style={[styles.editButtonText, { color: colors.primary }]}>{t('common.edit') || 'Modifier'}</Text>
        </Pressable> */}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.detailBox, { backgroundColor: colors.card }]}> 

          {/* Affichage du type de transaction */}
          <View style={styles.formGroup}> 
            {/* <Text style={[styles.label, { color: colors.settingDescription }]}>Type</Text> */}
            <View style={styles.typeSelector}> 
              <View style={[styles.typeButton, transaction.type === 'expense' && styles.activeTypeButton]}> 
                <ArrowDownLeft
                  size={20}
                  color={transaction.type === 'expense' ? '#fff' : colors.settingDescription}
                />
                <Text style={[styles.typeButtonText, transaction.type === 'expense' && styles.activeTypeButtonText]}> 
                  Dépense
                </Text>
              </View>
              <View style={[styles.typeButton, transaction.type === 'income' && styles.activeIncomeButton]}> 
                 <ArrowUpRight
                   size={20}
                   color={transaction.type === 'income' ? '#fff' : colors.settingDescription}
                 />
                 <Text style={[styles.typeButtonText, transaction.type === 'income' && styles.activeTypeButtonText]}> 
                   Revenu
                 </Text>
              </View>
            </View>
          </View>

          {/* Affichage de la catégorie */}
          <View style={styles.formGroup}> 
            <Text style={[styles.label, { color: colors.settingDescription }]}>Catégorie</Text>
            <View style={[styles.categoryButton,
                { backgroundColor: colors.background, borderColor: colors.border },
                transactionCategory && { backgroundColor: transactionCategory.color + '20', borderColor: transactionCategory.color }]}> 
              <Text style={[styles.categoryButtonText, { color: colors.settingDescription }, transactionCategory && { color: transactionCategory.color }]}> 
                {transactionCategory?.name || 'Unknown'}
              </Text>
            </View>
          </View>

          <View style={styles.formGroup}> 
            <Text style={[styles.label, { color: colors.settingDescription }]}>Montant</Text>
            <View style={[styles.amountContainer, { borderColor: colors.border }]}> 
              <Text style={[styles.currencySymbol, { color: colors.input.text }]}>{formatAmount(0).replace(/[\d,.]/g, '')}</Text> 
              <Text style={[styles.valueMontant, { color: colors.text, textAlign: 'right', flex: 1 }]}>{transaction.amount}</Text> 
            </View>
          </View>

          <View style={styles.formGroup}> 
            <Text style={[styles.label, { color: colors.settingDescription }]}>Date</Text>
            <Text style={[styles.value, { color: colors.text }]}>{format(transaction.date, 'EEEE, MMMM d, yyyy')}</Text> 
          </View>

          <View style={styles.formGroup}> 
            <Text style={[styles.label, { color: colors.settingDescription }]}>Description</Text>
            <Text style={[styles.value, { color: colors.text }]}>{transaction.description}</Text> 
          </View>

        </View>
      </ScrollView>

      <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleEdit}>
          <Text style={[styles.buttonText, { color: colors.button.text }]}>{t('detail.update') || 'Modifier'}</Text>
      </Pressable>

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleEditCancel}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.card }]}> 
          <Text style={[styles.modalTitle, { color: colors.titleText, borderBottomColor: colors.border }]}>{t('common.edit') || 'Modifier'} la transaction</Text>
          <TransactionModifForm 
            transactionId={transactionId}
            onSubmit={handleEditSubmit}
            onCancel={handleEditCancel}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  backButton: {
    marginRight: -25,
    zIndex: 1000
  },
  editButton: {
    marginLeft: 'auto',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 24,
  },
  title: {
    textAlign:'center',
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
  },
  detailBox: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  value: {
    fontSize: 20,
    marginTop: 2,
  },
  valueMontant: {
    fontSize: 24,
    marginTop: 2,
  },
  button: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 30,
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    paddingTop: 12,
    justifyContent: 'flex-start',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingBottom: 12,
    textAlign: 'center',
  },
  // Styles copiés/adaptés de TransactionForm
  formGroup: {
    marginBottom: 24,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12, // Adjusted margin
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
    backgroundColor: '#ef4444', // Expense color
  },
  activeIncomeButton: {
    backgroundColor: '#22c55e', // Income color
  },
  activeTypeButtonText: {
    color: '#fff',
  },
  categoriesContainer: {
    // No specific styles needed for a single item view
  },
  categoryButton: {
    paddingHorizontal: 25,
    paddingVertical: 14, // Adjusted padding
    borderRadius: 30,
    borderWidth: 1,
    // Removed marginRight as it's a single item
    alignSelf: 'flex-start', // Align to the start
  },
  categoryButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12, // Added padding
  },
  currencySymbol: {
    fontSize: 24,
    color: '#525252',
    marginRight: 8,
  },
}); 