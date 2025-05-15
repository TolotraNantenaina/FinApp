import { SQLiteDatabase } from 'expo-sqlite/legacy';
import { openDatabase } from 'expo-sqlite/legacy';

// Migration pour créer les tables si elles n'existent pas
export const migrateDbIfNeeded = (db: SQLiteDatabase): Promise<void> => {
  const DATABASE_VERSION = 1;

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Obtenir la version de la base de données
      tx.executeSql('PRAGMA user_version', [], (_, { rows }) => {
        let currentDbVersion = rows.item(0).user_version || 0;

        if (currentDbVersion >= DATABASE_VERSION) {
          resolve(); // Pas besoin de migration
          return;
        }

        if (currentDbVersion === 0) {
          // Migration initiale
          tx.executeSql('PRAGMA journal_mode = "wal";');

          // Créer les tables si elles n'existent pas
          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS User (
              id INTEGER PRIMARY KEY NOT NULL,
              name TEXT NOT NULL,
              first_name TEXT NOT NULL,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
          `);
          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Transactions (
              id INTEGER PRIMARY KEY NOT NULL,
              transaction_type TEXT NOT NULL,
              amount REAL NOT NULL,
              category_id INTEGER,
              transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              description TEXT,
              FOREIGN KEY (category_id) REFERENCES Categories(id)
            );
          `);
          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Categories (
              id INTEGER PRIMARY KEY NOT NULL,
              name TEXT NOT NULL,
              type TEXT NOT NULL
            );
          `);
          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS MonthlyReports (
              id INTEGER PRIMARY KEY NOT NULL,
              start_date DATETIME NOT NULL,
              end_date DATETIME NOT NULL,
              total_credits REAL,
              total_debits REAL,
              remaining_balance REAL
            );
          `);
          tx.executeSql(`
            CREATE TABLE IF NOT EXISTS Budgets (
              id INTEGER PRIMARY KEY NOT NULL,
              category_id INTEGER,
              amount REAL NOT NULL,
              month TEXT NOT NULL,
              FOREIGN KEY (category_id) REFERENCES Categories(id)
            );
          `);

          // Vérifier si des catégories existent déjà
          tx.executeSql('SELECT COUNT(*) as count FROM Categories', [], (_, { rows }) => {
            const count = rows.item(0).count;

            if (count === 0) {
              // Insertion des catégories par défaut
              const categories = [
                { name: 'Salaire', type: 'credit' },
                { name: 'Cadeau', type: 'credit' },
                { name: 'Remboursement', type: 'credit' },
                { name: 'Alimentaire', type: 'debit' },
                { name: 'Transport', type: 'debit' },
                { name: 'Divertissement', type: 'debit' },
                { name: 'Factures', type: 'debit' }
              ];

              categories.forEach(category => {
                tx.executeSql(
                  'INSERT INTO Categories (name, type) VALUES (?, ?)',
                  [category.name, category.type]
                );
              });
            }
          });

          // Mise à jour de la version de la base de données
          currentDbVersion = 1;
        }

        // Si d'autres migrations sont nécessaires à l'avenir
        // if (currentDbVersion === 1) {
        //   Ajouter d'autres migrations ici
        // }

        // Mise à jour de la version de la base de données
        tx.executeSql(`PRAGMA user_version = ${DATABASE_VERSION}`);
      });
    }, reject, resolve);
  });
};

// Migration pour créer les tables si elles n'existent pas
// export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
//   const DATABASE_VERSION = 1;
//   let versionning = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
//   let currentDbVersion: number | undefined = versionning?.user_version;

//   if (currentDbVersion && currentDbVersion >= DATABASE_VERSION) {
//     return;
//   }

//   if (currentDbVersion === 0) {
//     await db.execAsync(`
//       PRAGMA journal_mode = 'wal';

//       CREATE TABLE IF NOT EXISTS User (
//         id INTEGER PRIMARY KEY NOT NULL,
//         name TEXT NOT NULL,
//         first_name TEXT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//       );

//       CREATE TABLE IF NOT EXISTS Transactions (
//         id INTEGER PRIMARY KEY NOT NULL,
//         transaction_type TEXT NOT NULL,
//         amount REAL NOT NULL,
//         category_id INTEGER,
//         transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
//         description TEXT,
//         FOREIGN KEY (category_id) REFERENCES Categories(id)
//       );

//       CREATE TABLE IF NOT EXISTS Categories (
//         id INTEGER PRIMARY KEY NOT NULL,
//         name TEXT NOT NULL,
//         type TEXT NOT NULL
//       );

//       CREATE TABLE IF NOT EXISTS MonthlyReports (
//         id INTEGER PRIMARY KEY NOT NULL,
//         start_date DATETIME NOT NULL,
//         end_date DATETIME NOT NULL,
//         total_credits REAL,
//         total_debits REAL,
//         remaining_balance REAL
//       );

//       CREATE TABLE IF NOT EXISTS Budgets (
//         id INTEGER PRIMARY KEY NOT NULL,
//         category_id INTEGER,
//         amount REAL NOT NULL,
//         month TEXT NOT NULL,
//         FOREIGN KEY (category_id) REFERENCES Categories(id)
//       );
//     `);

//     const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM Categories');

//     if (result?.count === 0) {
//       const categories = [
//         { name: 'Salaire', type: 'credit' },
//         { name: 'Cadeau', type: 'credit' },
//         { name: 'Remboursement', type: 'credit' },
//         { name: 'Alimentaire', type: 'debit' },
//         { name: 'Transport', type: 'debit' },
//         { name: 'Divertissement', type: 'debit' },
//         { name: 'Factures', type: 'debit' }
//       ];

//       for (const category of categories) {
//         await db.runAsync('INSERT INTO Categories (name, type) VALUES (?, ?)', [
//           category.name,
//           category.type
//         ]);
//       }
//     }
    
//     currentDbVersion = 1;
//   }

//   await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
// };

// import SQLite from 'react-native-sqlite-storage';

// // Définir la version de la base de données
// const DATABASE_VERSION = 1;

// // Fonction de migration de la base de données
// export const migrateDbIfNeeded = async (db: SQLite.SQLiteDatabase) => {
//   try {
//     // Obtenir la version actuelle de la base de données
//     const [{ user_version }] = await executeSqlAsync(db, 'PRAGMA user_version', []);

//     let currentDbVersion = user_version || 0;
//     if (currentDbVersion >= DATABASE_VERSION) {
//       return; // Pas besoin de migration
//     }

//     // Migration initiale si la version est 0
//     if (currentDbVersion === 0) {
//       // Ouvrir une transaction pour effectuer toutes les migrations
//       await db.transaction(async (tx:any) => {
//         // Activer le journal WAL
//         await tx.executeSql('PRAGMA journal_mode = "wal"');

//         // Création des tables si elles n'existent pas
//         await tx.executeSql(`
//           CREATE TABLE IF NOT EXISTS User (
//             id INTEGER PRIMARY KEY NOT NULL,
//             name TEXT NOT NULL,
//             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//           );
//         `);
//         await tx.executeSql(`
//           CREATE TABLE IF NOT EXISTS Transactions (
//             id INTEGER PRIMARY KEY NOT NULL,
//             transaction_type TEXT NOT NULL,
//             amount REAL NOT NULL,
//             category_id INTEGER,
//             transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
//             description TEXT,
//             FOREIGN KEY (category_id) REFERENCES Categories(id)
//           );
//         `);
//         await tx.executeSql(`
//           CREATE TABLE IF NOT EXISTS Categories (
//             id INTEGER PRIMARY KEY NOT NULL,
//             name TEXT NOT NULL,
//             type TEXT NOT NULL
//           );
//         `);
//         await tx.executeSql(`
//           CREATE TABLE IF NOT EXISTS MonthlyReports (
//             id INTEGER PRIMARY KEY NOT NULL,
//             start_date DATETIME NOT NULL,
//             end_date DATETIME NOT NULL,
//             total_credits REAL,
//             total_debits REAL,
//             remaining_balance REAL
//           );
//         `);
//         await tx.executeSql(`
//           CREATE TABLE IF NOT EXISTS Budgets (
//             id INTEGER PRIMARY KEY NOT NULL,
//             category_id INTEGER,
//             amount REAL NOT NULL,
//             month TEXT NOT NULL,
//             FOREIGN KEY (category_id) REFERENCES Categories(id)
//           );
//         `);

//         // Vérifier si la table Categories contient déjà des enregistrements
//         const [{ count }] = await executeSqlAsync(tx, 'SELECT COUNT(*) as count FROM Categories', []);

//         // Insérer les catégories par défaut si nécessaire
//         if (count === 0) {
//           const categories = [
//             { name: 'Salaire', type: 'credit' },
//             { name: 'Cadeau', type: 'credit' },
//             { name: 'Remboursement', type: 'credit' },
//             { name: 'Alimentaire', type: 'debit' },
//             { name: 'Transport', type: 'debit' },
//             { name: 'Divertissement', type: 'debit' },
//             { name: 'Factures', type: 'debit' }
//           ];

//           for (const category of categories) {
//             await tx.executeSql(
//               'INSERT INTO Categories (name, type) VALUES (?, ?)',
//               [category.name, category.type]
//             );
//           }
//         }
//       });

//       // Mettre à jour la version de la base de données après la migration
//       await db.executeSql(`PRAGMA user_version = ${DATABASE_VERSION}`);
//     }

//     // Si d'autres migrations sont nécessaires
//     // if (currentDbVersion === 1) {
//     //   // Ajouter d'autres migrations ici
//     // }

//   } catch (error) {
//     console.error('Error migrating database:', error);
//   }
// };

// // Fonction utilitaire pour exécuter des requêtes SQL avec promesses
// const executeSqlAsync = (
//   db: SQLite.SQLiteDatabase,
//   query: string,
//   params: any[] = []
// ): Promise<any[]> => {
//   return new Promise((resolve, reject) => {
//     db.executeSql(
//       query,
//       params,
//       (_:any, result:any) => {
//         const rows = [];
//         for (let i = 0; i < result.rows.length; i++) {
//           rows.push(result.rows.item(i));
//         }
//         resolve(rows);
//       },
//       (_:any, error:any) => {
//         console.error('SQL Error:', error);
//         reject(error);
//         return false;
//       }
//     );
//   });
// };
