import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importer Picker depuis le bon module

export default function TabTwoScreen() {
  const [selectedMonth, setSelectedMonth] = useState('january');
  const [selectedYear, setSelectedYear] = useState('2023');

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Bilan Mensuel</Text> */}

      {/* Filtrage */}
      <View style={styles.filterContainer}>
        <View style={styles.filterCard}>
          <Text style={styles.subHeader}>Filtrage</Text>
          <View style={styles.filterRow}>
            <View style={styles.filterGroup}>
              <Text style={styles.label}>Filtrer par Mois:</Text>
              <Picker
                selectedValue={selectedMonth}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              >
                <Picker.Item label="Janvier" value="january" />
                <Picker.Item label="Février" value="february" />
                <Picker.Item label="Mars" value="march" />
              </Picker>
            </View>
            <View style={styles.filterGroup}>
              <Text style={styles.label}>Filtrer par Année:</Text>
              <Picker
                selectedValue={selectedYear}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
              >
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2021" value="2021" />
              </Picker>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        {/* Graphiques */}
        <View style={styles.card}>
          <Text style={styles.subHeader}>Graphiques</Text>
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Dépenses par Catégorie</Text>
            <Image
              source={{ uri: 'https://openui.fly.dev/openui/600x300.svg?text=Bar+Chart' }}
              style={styles.chartImage}
            />
          </View>
          <View>
            <Text style={styles.chartTitle}>Progression du Solde</Text>
            <Image
              source={{ uri: 'https://openui.fly.dev/openui/600x300.svg?text=Line+Chart' }}
              style={styles.chartImage}
            />
          </View>
        </View>

        {/* Résumé */}
        <View style={styles.card}>
          <Text style={styles.subHeader}>Résumé</Text>
          <View>
            <Text style={styles.summaryText}>
              Total Crédits: <Text style={styles.boldText}>$1,500</Text>
            </Text>
            <Text style={styles.summaryText}>
              Total Débits: <Text style={styles.boldText}>$1,200</Text>
            </Text>
            <Text style={styles.summaryText}>
              Solde Final: <Text style={styles.boldText}>$300</Text>
            </Text>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    overflow: 'scroll',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    flexDirection: 'column', // Changer la direction en colonne
    justifyContent: 'flex-start', // Aligner les cartes en haut
    flexWrap: 'nowrap', // Empêcher le retour à la ligne
    alignItems: 'stretch', // Aligner les cartes pour qu'elles prennent toute la largeur
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 16,
    // flex: 1,
    marginRight: 4,
    elevation: 2,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  chartSection: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  chartImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  filterContainer: {
    // marginTop: 24,
    marginBottom: 16,
  },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 16,
    elevation: 2,
    marginRight: 4,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc', // Border color
    marginLeft: 8,
    height: 46,
    width: 100,
    borderRadius: 8,
  },
});

// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function TabTwoScreen() {
//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>Tab Two</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
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
