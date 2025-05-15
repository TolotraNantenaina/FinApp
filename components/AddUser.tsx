import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddUserModal() {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddUser = () => {
    // Logique pour ajouter l'utilisateur à la base de données
    console.log({ name, firstName, description });
    // Ajoutez ici la logique pour insérer l'utilisateur dans la base de données
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ajouter un Utilisateur</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={firstName}
          onChangeText={setFirstName}
        />
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

      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Ajouter l'Utilisateur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
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
    color: '#6c757d',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flex: 1,
    height: 5
  },
  textArea: {
    height: 80,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});