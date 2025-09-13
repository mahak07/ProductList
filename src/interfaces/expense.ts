export interface Expense {
  id?: number;
  category: string;
  amount: number;
  date: string; // ISO format
  note?: string;
}