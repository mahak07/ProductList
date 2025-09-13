import SQLite from 'react-native-sqlite-storage';
import { Expense } from '../interfaces/expense';

const db = SQLite.openDatabase(
  { name: 'expenses.db', location: 'default' },
  () => console.log('DB opened'),
  error => console.log('DB open error', error)
);

export const initDB = (): void => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        note TEXT
      );`
    );
  });
};

export const insertExpense = (expense: Expense): void => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO expenses (category, amount, date, note) VALUES (?, ?, ?, ?);`,
      [expense.category, expense.amount, expense.date, expense.note]
    );
  });
};

export const fetchExpenses = (): Promise<Expense[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM expenses;`, [], (tx, results) => {
        const expenses: Expense[] = [];
        for (let i = 0; i < results.rows.length; ++i) {
          expenses.push(results.rows.item(i));
        }
        resolve(expenses);
      });
    });
  });
};

export const fetchExpensesByCategory = (): Promise<{ category: string; total: number }[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT category, SUM(amount) as total FROM expenses GROUP BY category;`,
        [],
        (tx, results) => {
          const data = [];
          for (let i = 0; i < results.rows.length; ++i) {
            data.push(results.rows.item(i));
          }
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};