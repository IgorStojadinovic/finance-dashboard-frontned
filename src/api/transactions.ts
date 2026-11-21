import { Transaction } from '../lib/types/types';
import { apiFetch } from './client';

export const transactionsApi = {
  getAll: () => apiFetch<Transaction[]>('/transactions'),

  getById: (id: string) => apiFetch<Transaction>(`/transactions/${id}`),

  getTransactionsByUserId: (userId: string) =>
    apiFetch<Transaction[]>(`/transactions/user/${userId}`),

  create: (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiFetch<Transaction>('/transactions', { method: 'POST', body: data }),

  update: (id: string, data: Partial<Transaction>) =>
    apiFetch<Transaction>(`/transactions/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) =>
    apiFetch<void>(`/transactions/${id}`, { method: 'DELETE' }),

  sortByCategory: (category: string) =>
    apiFetch<Transaction[]>(`/transactions/category/${category}`),
};
