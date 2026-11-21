import { Budget, NewBudget } from '../lib/types/types';
import { apiFetch } from './client';

export const budgetsApi = {
  getAll: () => apiFetch<Budget[]>('/budgets'),

  getById: (id: string) => apiFetch<Budget>(`/budgets/${id}`),

  getUserBudgets: (userId: string) =>
    apiFetch<Budget[]>(`/budgets/user/${userId}`),

  getByCategory: (userId: string, category: string) =>
    apiFetch<Budget[]>(`/budgets/user/${userId}/category/${category}`),

  create: (data: NewBudget) =>
    apiFetch<Budget>('/budgets', { method: 'POST', body: data }),

  update: (id: string, data: Partial<Budget>) =>
    apiFetch<Budget>(`/budgets/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) =>
    apiFetch<void>(`/budgets/${id}`, { method: 'DELETE' }),
};
