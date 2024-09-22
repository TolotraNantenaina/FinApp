import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importer Picker depuis le bon module

export default function ModalScreen() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ajouter une Transaction</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Montant</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Picker
            selectedValue={currency}
            style={styles.picker}
            onValueChange={(itemValue) => setCurrency(itemValue)}
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
          </Picker>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Catégorie</Text>
        <Picker
          selectedValue={category}
          style={styles.input}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Nourriture" value="food" />
          <Picker.Item label="Transport" value="transport" />
          <Picker.Item label="Divertissement" value="entertainment" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Type de Transaction</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setTransactionType('credit')} style={styles.radioOption}>
            <Text>Crédit</Text>
            <View style={styles.radioCircle}>
              {transactionType === 'credit' && <View style={styles.selectedCircle} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTransactionType('debit')} style={styles.radioOption}>
            <Text>Débit</Text>
            <View style={styles.radioCircle}>
              {transactionType === 'debit' && <View style={styles.selectedCircle} />}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description (facultatif)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ajouter une description..."
          multiline={true}
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enregistrer la Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff', // Replace with your card background color
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    maxWidth: '90%',
    margin: 'auto',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6c757d', // Muted color
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc', // Border color
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc', // Border color
    marginLeft: 8,
    height: 46,
    width: 100,
    borderRadius: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  textArea: {
    height: 80,
  },
  button: {
    backgroundColor: '#007bff', // Primary color
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

// import { StatusBar } from 'expo-status-bar';
// import { Platform, StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function ModalScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Modal</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(modals)/modal.tsx" />

//       {/* Use a light status bar on iOS to account for the black space above the modal */}
//       <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
