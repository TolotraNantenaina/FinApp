import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Category, Budget } from '@/types';
import { format } from 'date-fns';

interface AppState {
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  initialBalance: number;
  
  // Transactions methods
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransactionsByMonth: (month: number, year: number) => Transaction[];
  
  // Categories methods
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Budgets methods
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  
  // Balance methods
  getCurrentBalance: () => number;
  setInitialBalance: (balance: number) => void;
  
  // Stats methods
  getMonthlyTotals: (month: number, year: number) => { income: number; expense: number; balance: number };
  getCategorySpending: (month: number, year: number) => { categoryId: string; amount: number }[];
}

// Helper to generate a simple UUID
const generateId = () => Math.random().toString(36).substring(2, 15);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      transactions: [],
      categories: [
        { id: 'food', name: 'Food & Drinks', icon: 'utensils', color: '#FF9F1C' },
        { id: 'transport', name: 'Transport', icon: 'bus', color: '#2EC4B6' },
        { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', color: '#E71D36' },
        { id: 'entertainment', name: 'Entertainment', icon: 'film', color: '#011627' },
        { id: 'bills', name: 'Bills & Utilities', icon: 'file-invoice', color: '#6D10FF' },
        { id: 'health', name: 'Health', icon: 'heartbeat', color: '#8AC926' },
        { id: 'salary', name: 'Salary', icon: 'money-bill-wave', color: '#38A3A5' },
        { id: 'other', name: 'Other', icon: 'ellipsis-h', color: '#7d7d7d' },
      ],
      budgets: [],
      initialBalance: 0,
      
      // Transactions methods
      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: generateId(),
        };
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },
      
      updateTransaction: (id, transaction) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...transaction } : t
          ),
        }));
      },
      
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
      
      getTransactionsByMonth: (month, year) => {
        return get().transactions.filter((t) => {
          const date = new Date(t.date);
          return date.getMonth() === month && date.getFullYear() === year;
        });
      },
      
      // Categories methods
      addCategory: (category) => {
        const newCategory = {
          ...category,
          id: generateId(),
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },
      
      updateCategory: (id, category) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c
          ),
        }));
      },
      
      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },
      
      // Budgets methods
      addBudget: (budget) => {
        const newBudget = {
          ...budget,
          id: generateId(),
        };
        set((state) => ({
          budgets: [...state.budgets, newBudget],
        }));
      },
      
      updateBudget: (id, budget) => {
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...budget } : b
          ),
        }));
      },
      
      deleteBudget: (id) => {
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        }));
      },
      
      // Balance methods
      getCurrentBalance: () => {
        const { transactions, initialBalance } = get();
        
        const totalIncome = transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
          
        const totalExpense = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
          
        return initialBalance + totalIncome - totalExpense;
      },
      
      setInitialBalance: (balance) => {
        set({ initialBalance: balance });
      },
      
      // Stats methods
      getMonthlyTotals: (month, year) => {
        const monthTransactions = get().getTransactionsByMonth(month, year);
        
        const income = monthTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
          
        const expense = monthTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
          
        return {
          income,
          expense,
          balance: income - expense,
        };
      },
      
      getCategorySpending: (month, year) => {
        const monthTransactions = get().getTransactionsByMonth(month, year);
        const expensesByCategory: Record<string, number> = {};
        
        monthTransactions
          .filter((t) => t.type === 'expense')
          .forEach((t) => {
            expensesByCategory[t.categoryId] = (expensesByCategory[t.categoryId] || 0) + t.amount;
          });
          
        return Object.entries(expensesByCategory).map(([categoryId, amount]) => ({
          categoryId,
          amount,
        }));
      },
    }),
    {
      name: 'finance-app-storage',
    }
  )
);