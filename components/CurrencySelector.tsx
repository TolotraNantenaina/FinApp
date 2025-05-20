import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/store/appStore';
import { useTheme, ThemeMode } from '@/store/themeStore';

const currencies = {
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'fr-FR' },
  USD: { code: 'USD', symbol: '$', name: 'Dollar', locale: 'en-US' },
  GBP: { code: 'GBP', symbol: '£', name: 'Livre', locale: 'en-GB' },
  MGA: { code: 'MGA', symbol: 'Ar', name: 'Ariary', locale: 'mg-MG' },
};

export function CurrencySelector() {
  const { mode, setMode, colors } = useTheme();
  const { currency, setCurrency } = useAppStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentCurrency = currencies[currency.code as keyof typeof currencies];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.card }]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          {currentCurrency.symbol} {currentCurrency.code}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={colors.text}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable 
          style={[styles.modalOverlay, { backgroundColor: colors.modal.overlay }]}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.modal.background }]}>
            {Object.values(currencies).map((curr) => (
              <TouchableOpacity
                key={curr.code}
                style={[
                  styles.option,
                  { borderBottomColor: colors.border },
                  currency.code === curr.code && { backgroundColor: colors.button.secondary }/*styles.selectedOption*/
                ]}
                onPress={() => {
                  setCurrency(curr);
                  setIsOpen(false);
                }}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>
                  {curr.symbol} {curr.name} ({curr.code})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
  },
}); 