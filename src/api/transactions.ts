import { Transaction } from '../lib/types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const transactionsApi = {
  getAll: (): Promise<Transaction[]> =>
    fetch(`${API_BASE_URL}/transactions`).then(res => res.json()),

  getById: (id: string): Promise<Transaction> =>
    fetch(`${API_BASE_URL}/transactions/${id}`).then(res => res.json()),

  getUserTransactions: (userId: string): Promise<Transaction[]> =>
    fetch(`${API_BASE_URL}/transactions/user/${userId}`).then(res =>
      res.json()
    ),

  create: (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<Transaction>) =>
    fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string) =>
    fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),

  sortByCategory: (category: string): Promise<Transaction[]> =>
    fetch(`${API_BASE_URL}/transactions/category/${category}`).then(res =>
      res.json()
    ),
};
