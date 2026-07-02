import { Budget } from '../lib/types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const budgetsApi = {
  getAll: (): Promise<Budget[]> =>
    fetch(`${API_BASE_URL}/budgets`).then(res => res.json()),

  getById: (id: string): Promise<Budget> =>
    fetch(`${API_BASE_URL}/budgets/${id}`).then(res => res.json()),

  getUserBudgets: (userId: string): Promise<Budget[]> =>
    fetch(`${API_BASE_URL}/budgets/user/${userId}`).then(res => res.json()),

  getByCategory: (userId: string, category: string): Promise<Budget[]> =>
    fetch(`${API_BASE_URL}/budgets/user/${userId}/category/${category}`).then(
      res => res.json()
    ),

  create: (data: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetch(`${API_BASE_URL}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<Budget>) =>
    fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string) =>
    fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};
