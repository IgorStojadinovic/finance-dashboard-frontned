import { User } from '../lib/types/types';
import { apiFetch } from './client';

export const usersApi = {
  getAll: () => apiFetch<User[]>('/users'),

  getUser: (id: string) => apiFetch<User>(`/users/${id}`),

  getById: (id: string) => apiFetch<User>(`/users/${id}`),

  create: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiFetch<User>('/users', { method: 'POST', body: data }),

  update: (id: string, data: Partial<User>) =>
    apiFetch<User>(`/users/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiFetch<void>(`/users/${id}`, { method: 'DELETE' }),
};
