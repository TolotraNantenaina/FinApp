export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: Date;
  description?: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

export interface MonthlyReport {
  month: number;
  year: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryBreakdown: {
    categoryId: string;
    amount: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  initialBalance: number;
}