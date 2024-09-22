import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// ProgressBar Component
const ProgressBar = ({ progress }: { progress: number }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);

// SummaryItem Component
const SummaryItem = ({ title, amount }: { title: string, amount: string }) => (
  <View>
    <Text style={styles.gridItem}>{title}</Text>
    <Text style={styles.totalAmount}>€{amount}</Text>
  </View>
);

// Main Component
const Dashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Solde Actuel</Text>
        <Text style={styles.Amount}>€200</Text>
        <View style={styles.row}>
          <ProgressBar progress={75} />
          <Text style={styles.progressText}>75%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Évolution des Crédits et Débits</Text>
        <Image
          source={{ uri: 'https://openui.fly.dev/openui/600x300.svg?text=Graphique' }}
          style={styles.image}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.accentButton]}>
          <Text style={styles.buttonText}>Ajouter un Crédit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.destructiveButton]}>
          <Text style={styles.buttonText}>Ajouter un Débit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Résumé Rapide</Text>
        <View style={styles.grid}>
          <SummaryItem title="Crédits Totaux" amount="500" />
          <SummaryItem title="Débits Totaux" amount="300" />
          <SummaryItem title="Solde Restant" amount="200" />
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0', // Replace this with your background color
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff', // Replace with your card background color
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    backgroundColor: '#d3d3d3',
    height: 8,
    borderRadius: 4,
    flex: 1,
  },
  progressBar: {
    backgroundColor: '#4CAF50',
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  accentButton: {
    backgroundColor: '#007bff', // Replace with your accent color
  },
  destructiveButton: {
    backgroundColor: '#dc3545', // Replace with your destructive color
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    fontSize: 14,
    color: '#6c757d', // Replace with your muted color
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Amount: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Dashboard;
