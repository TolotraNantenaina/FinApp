import { openDatabase } from "expo-sqlite/legacy";

export const connectToDatabase = async () => {
  return openDatabase('financeApp.db');
}

// Fonction pour vérifier si la table User est vide
export const isUserTableEmpty = async () => {
  const db = await connectToDatabase();
  const result = await new Promise<{ count: number }>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT COUNT(*) as count FROM User', [],
        (_, resultSet) => resolve(resultSet.rows.item(0)),
        // (_, error) => reject(error)
      );
    });
  });
  return result?.count === 0;
};

// Fonction pour vérifier si la table Transactions est vide
export const isTransactionsTableEmpty = async () => {
  const db = await connectToDatabase();
  const result = await new Promise<{ count: number }>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT COUNT(*) as count FROM Transaction', [],
        (_, resultSet) => resolve(resultSet.rows.item(0)),
        // (_, error) => reject(error)
      );
    });
  });
  return result?.count === 0;
};

// import SQLite from 'react-native-sqlite-storage';
// import {
//   enablePromise,
//   openDatabase,
// } from "react-native-sqlite-storage"

// enablePromise(true);

// export const connectToDatabase = async () => {
//   return openDatabase(
//     { name: "financeApp.db", location: "default" },
//     () => {},
//     (error) => {
//       console.error(error)
//       throw Error("Could not connect to database")
//     }
//   )
// }

// // Ouvre la base de données de manière synchrone
// // const base = SQLite.openDatabase(
// //   {
// //     name: 'financeApp.db',
// //     location: 'default',
// //   },
// //   () => {
// //     console.log('Database opened successfully');
// //   },
// //   (error:any) => {
// //     console.error('Error opening database', error);
// //   }
// // );

// // export default base;

// // Fonction pour vérifier si la table User est vide
// export const isUserTableEmpty = async () => {
//   let bool: boolean = true;
//   const base = await connectToDatabase();
  
//   await base.transaction( async (tx:any) => {
//     await tx.executeSql(
//       'SELECT COUNT(*) as count FROM User',
//       [],
//       (_:any, resultSet:any) => {
//         const count = resultSet.rows.item(0).count;
//         bool = (count === 0);
//       },
//       (_:any, error:any) => {
//         console.error('Error querying User table', error);
//         bool = true;
//       }
//     );
//   });
  
//   return bool;
// };

// // Fonction pour vérifier si la table Transactions est vide
// export const isTransactionsTableEmpty = async () => {
//   let bool: boolean = true;
//   const base = await connectToDatabase();
  
//   await base.transaction( async (tx:any) => {
//     await tx.executeSql(
//         'SELECT COUNT(*) as count FROM Transactions',
//         [],
//         (_:any, resultSet:any) => {
//           const count = resultSet.rows.item(0).count;
//           bool = (count === 0);
//         },
//         (_:any, error:any) => {
//           console.error('Error querying Transactions table', error);
//           bool = true;
//         }
//       );
//     });
  
//   return bool;
// };
