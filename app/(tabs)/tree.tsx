import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker'; // Importer Picker depuis le bon module
import { AntDesign } from '@expo/vector-icons'; // Assurez-vous d'installer cette bibliothèque


// Reusable styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: '#f0f0f0',
    overflow: 'scroll',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  Flist: {
    backgroundColor: '#fff', // Replace with your bg-card color
    borderRadius: 12, // Equivalent to 'rounded-lg'
    shadowColor: '#000', // Equivalent to 'shadow-md'
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listText: {
    fontSize: 18,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#ff6347',
  },
  mutedText: {
    color: '#777',
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 8,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  exportButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  paginationText: {
    paddingHorizontal: 7,
    paddingBottom: 7,
    paddingTop: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    height: 35,
    width: 45,
  },
  paginationButton: {
    paddingHorizontal: 7,
    paddingBottom: 7,
    paddingTop: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 35,
  },
  paginationPicker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingBottom: 5,
    paddingTop: 6,
    marginHorizontal: 4,
    width: 40,
    height: 35,
    fontSize: 12,
  },
  textSize: {
    fontSize: 12,
  },
  paginationTextSize: {
    fontSize: 13,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterCard: {
    marginBottom: 16,
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
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  Icon: {
    fontSize: 12,
    paddingTop: 2, // Utiliser 'transform' au lieu de 'rotate'
  },
  separator: {
    width: 2, // Largeur de la ligne
    backgroundColor: '#ccc', // Couleur de la ligne
    height: '100%', // Hauteur du séparateur
    marginHorizontal: 8, // Espacement horizontal
  },
  bold: {
    fontWeight : 'bold',
    color: 'red',
  }
});

// Component for rendering each expense item
const ExpenseList = ({ expenses }: { expenses: any[] }) => {
  return (
    <FlatList
      style={styles.Flist}
      data={expenses}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listText}>{item.category}</Text>
          <Text style={[styles.boldText, styles.listText]}>{item.amount} €</Text>
          <Text style={styles.mutedText}>{item.date}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: 'https://openui.fly.dev/openui/24x24.svg?text=🔍' }}
              style={styles.icon}
            />
            <Image
              source={{ uri: 'https://openui.fly.dev/openui/24x24.svg?text=✏️' }}
              style={styles.icon}
            />
          </View>
        </View>
      )}
    />
  );
};

// Component for pagination
const Pagination = ({ itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, totalItems } :
                      { itemsPerPage : number, setItemsPerPage: any, currentPage: number, setCurrentPage: any, totalItems : number }  
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];
    
    // Toujours afficher la première page
    pages.push(
      <TouchableOpacity 
        key={1} 
        style={currentPage === 1 ?
          { ...styles.paginationButton,
            backgroundColor: '#3498DB',
            borderColor: '#fff',
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            // shadowRadius: 5,
            paddingTop: 7,
            } : styles.paginationButton}
        onPress={() => setCurrentPage(1)}
      >
        <Text style={currentPage === 1 ?
          { ...styles.textSize,
            color: '#fff',
            fontSize : 14,
            fontWeight: 'bold', } : styles.textSize}>1</Text>
      </TouchableOpacity>
    );

    // Afficher '...' si la première page n'est pas adjacente à la page actuelle
    if (currentPage > 3) {
      pages.push(<Text style={{paddingTop: 6,fontWeight: 'bold'}} key="ellipsis-start">...</Text>);
    }

    // Afficher les pages adjacentes
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(
        <TouchableOpacity 
          key={i} 
          style={currentPage === i ?
            { ...styles.paginationButton,
              backgroundColor: '#3498DB', 
              borderColor: '#fff',
              shadowColor: '#fff' ,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              // shadowRadius: 5,
              paddingTop: 7,
            } : styles.paginationButton} 
          onPress={() => setCurrentPage(i)}
        >
          <Text style={currentPage === i ?
          { ...styles.textSize,
            color: '#fff',
            fontSize : 14,
            fontWeight: 'bold', } : styles.textSize}>{i}</Text>
        </TouchableOpacity>
      );
    }

    // Afficher '...' si la dernière page n'est pas adjacente à la page actuelle
    if (currentPage < totalPages - 2) {
      pages.push(<Text style={{paddingTop: 6,fontWeight: 'bold'}} key="ellipsis-end">...</Text>);
    }

    // Toujours afficher la dernière page
    if (totalPages > 1) {
      pages.push(
        <TouchableOpacity 
          key={totalPages} 
          style={currentPage === totalPages ?
            { ...styles.paginationButton,
              backgroundColor: '#3498DB', 
              borderColor: '#fff',
              shadowColor: '#fff' ,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              // shadowRadius: 5,
              paddingTop: 7,
            } : styles.paginationButton} 
          onPress={() => setCurrentPage(totalPages)}
        >
          <Text style={currentPage === totalPages ?
          { ...styles.textSize,
            color: '#fff',
            fontSize : 14,
            fontWeight: 'bold', } : styles.textSize}>{totalPages}</Text>
        </TouchableOpacity>
      );
    }

    return pages;
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity style={styles.paginationText}>
        <Text style={styles.paginationTextSize}>Par :</Text>
      </TouchableOpacity>
      <Picker
        selectedValue={itemsPerPage.toString()}
        style={styles.paginationPicker}
        onValueChange={(itemValue) => {
          setItemsPerPage(parseInt(itemValue));
          setCurrentPage(1); // Réinitialiser à la première page lors du changement
        }}
      >
        <Picker.Item style={styles.textSize} label="5" value="5" />
        <Picker.Item style={styles.textSize} label="10" value="10" />
        <Picker.Item style={styles.textSize} label="15" value="15" />
      </Picker>
      <View style={styles.separator} />
      <TouchableOpacity 
        style={styles.paginationButton} 
        onPress={() => setCurrentPage((prev:number) => Math.max(prev - 1, 1))}
      >
        <AntDesign style={[styles.Icon]} name="left" size={24} color="black" />
      </TouchableOpacity>
      {renderPageNumbers()}
      <TouchableOpacity 
        style={styles.paginationButton} 
        onPress={() => setCurrentPage((prev:number) => Math.min(prev + 1, totalPages))}
      >
        <AntDesign style={[styles.Icon]} name="right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<{ amount: string; category: string; date: string; }[]>([]);

  useEffect(() => {
    setExpenses([
      { amount: '10,00', category: 'Alimentation', date: '01/10/2023' },
      { amount: '50,00', category: 'Loisirs', date: '02/10/2023' },
      { amount: '20,00', category: 'Transport', date: '03/10/2023' },
      { amount: '10,00', category: 'Alimentation', date: '01/10/2023' },
      { amount: '50,00', category: 'Loisirs', date: '02/10/2023' },
      { amount: '20,00', category: 'Transport', date: '03/10/2023' },
      { amount: '15,00', category: 'Alimentation', date: '04/10/2023' },
      { amount: '30,00', category: 'Loisirs', date: '05/10/2023' },
      { amount: '25,00', category: 'Transport', date: '06/10/2023' },
      { amount: '40,00', category: 'Alimentation', date: '07/10/2023' },
      { amount: '60,00', category: 'Loisirs', date: '08/10/2023' },
      { amount: '35,00', category: 'Transport', date: '09/10/2023' },
      { amount: '45,00', category: 'Alimentation', date: '10/10/2023' },
      { amount: '55,00', category: 'Loisirs', date: '11/10/2023' },
      { amount: '65,00', category: 'Transport', date: '12/10/2023' },
      { amount: '75,00', category: 'Alimentation', date: '13/10/2023' },
      { amount: '85,00', category: 'Loisirs', date: '14/10/2023' },
      { amount: '95,00', category: 'Transport', date: '15/10/2023' },
      { amount: '100,00', category: 'Alimentation', date: '16/10/2023' },
      { amount: '110,00', category: 'Loisirs', date: '17/10/2023' },
      { amount: '120,00', category: 'Transport', date: '18/10/2023' },
      { amount: '130,00', category: 'Alimentation', date: '19/10/2023' },
      { amount: '140,00', category: 'Loisirs', date: '20/10/2023' },
      { amount: '150,00', category: 'Transport', date: '21/10/2023' },
      { amount: '160,00', category: 'Alimentation', date: '22/10/2023' },
      { amount: '170,00', category: 'Loisirs', date: '23/10/2023' },
      { amount: '180,00', category: 'Transport', date: '24/10/2023' },
      { amount: '190,00', category: 'Alimentation', date: '25/10/2023' },
      { amount: '200,00', category: 'Loisirs', date: '26/10/2023' },
      { amount: '210,00', category: 'Transport', date: '27/10/2023' },
      { amount: '220,00', category: 'Alimentation', date: '28/10/2023' },
      { amount: '230,00', category: 'Loisirs', date: '29/10/2023' },
      { amount: '240,00', category: 'Transport', date: '30/10/2023' },
      { amount: '250,00', category: 'Alimentation', date: '31/10/2023' },
      { amount: '260,00', category: 'Loisirs', date: '01/11/2023' },
      { amount: '270,00', category: 'Transport', date: '02/11/2023' },
      { amount: '280,00', category: 'Alimentation', date: '03/11/2023' },
      { amount: '290,00', category: 'Loisirs', date: '04/11/2023' },
      { amount: '300,00', category: 'Transport', date: '05/11/2023' },
      { amount: '310,00', category: 'Alimentation', date: '06/11/2023' },
      { amount: '320,00', category: 'Loisirs', date: '07/11/2023' },
      { amount: '330,00', category: 'Transport', date: '08/11/2023' },
      { amount: '340,00', category: 'Alimentation', date: '09/11/2023' },
      { amount: '350,00', category: 'Loisirs', date: '10/11/2023' },
      { amount: '360,00', category: 'Transport', date: '11/11/2023' },
      { amount: '370,00', category: 'Alimentation', date: '12/11/2023' },
      { amount: '380,00', category: 'Loisirs', date: '13/11/2023' },
      { amount: '390,00', category: 'Transport', date: '14/11/2023' },
      { amount: '400,00', category: 'Alimentation', date: '15/11/2023' },
      { amount: '410,00', category: 'Loisirs', date: '16/11/2023' },
      { amount: '420,00', category: 'Transport', date: '17/11/2023' },
      { amount: '430,00', category: 'Alimentation', date: '18/11/2023' },
      { amount: '440,00', category: 'Loisirs', date: '19/11/2023' },
      { amount: '450,00', category: 'Transport', date: '20/11/2023' },
      { amount: '460,00', category: 'Alimentation', date: '21/11/2023' },
      { amount: '470,00', category: 'Loisirs', date: '22/11/2023' },
      { amount: '480,00', category: 'Transport', date: '23/11/2023' },
      { amount: '490,00', category: 'Alimentation', date: '24/11/2023' },
      { amount: '500,00', category: 'Loisirs', date: '25/11/2023' },
      { amount: '510,00', category: 'Transport', date: '26/11/2023' },
      { amount: '520,00', category: 'Alimentation', date: '27/11/2023' },
      { amount: '530,00', category: 'Loisirs', date: '28/11/2023' },
      { amount: '540,00', category: 'Transport', date: '29/11/2023' },
      { amount: '550,00', category: 'Alimentation', date: '30/11/2023' },
      { amount: '560,00', category: 'Loisirs', date: '01/12/2023' },
      { amount: '570,00', category: 'Transport', date: '02/12/2023' },
      { amount: '580,00', category: 'Alimentation', date: '03/12/2023' },
      { amount: '590,00', category: 'Loisirs', date: '04/12/2023' },
      { amount: '600,00', category: 'Transport', date: '05/12/2023' },
    ]);
}, []);

  const [selectedSort, setSelectedSort] = useState('montant');
  const [itemsPerPage, setItemsPerPage] = useState(10); // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

  // Fonction pour trier les dépenses
  const sortedExpenses = () => {
    return [...expenses].sort((a, b) => {
      if (selectedSort === 'montant') {
        return parseFloat(a.amount.replace(',', '.')) - parseFloat(b.amount.replace(',', '.'));
      } else if (selectedSort === 'categorie') {
        return a.category.localeCompare(b.category);
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });
  };

  // Fonction pour paginer les dépenses
  const paginatedExpenses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedExpenses().slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterCard}>
        <Text style={styles.subHeader}>Triage</Text>
        <View style={styles.filterContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Picker
              selectedValue={selectedSort}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSort(itemValue)}
            >
              <Picker.Item label="Trier par Montant" value="montant" />
              <Picker.Item label="Trier par Catégorie" value="categorie" />
              <Picker.Item label="Trier par Date" value="date" />
            </Picker>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Trier</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.buttonText}>Exporter</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ExpenseList expenses={paginatedExpenses()} />
      <Pagination 
        itemsPerPage={itemsPerPage} 
        setItemsPerPage={setItemsPerPage} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalItems={expenses.length} 
      />
    </View>
  );
};

export default ExpenseTracker;


// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function TabTreeScreen() {
//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>Tab Tree</Text>
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


