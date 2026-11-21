import { CreatePot, Pot } from '../lib/types/types';
import { apiFetch } from './client';

export const potsApi = {
  getAll: () => apiFetch<Pot[]>('/pots'),

  getById: (id: string) => apiFetch<Pot>(`/pots/${id}`),

  getUserPots: (userId: string) => apiFetch<Pot[]>(`/pots/user/${userId}`),

  create: (data: CreatePot) =>
    apiFetch<Pot>('/pots', { method: 'POST', body: data }),

  update: (id: string, data: Partial<Pot>) =>
    apiFetch<Pot>(`/pots/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiFetch<void>(`/pots/${id}`, { method: 'DELETE' }),

  updateTotal: (id: string, amount: number) =>
    apiFetch<Pot>(`/pots/${id}/total`, {
      method: 'PATCH',
      body: { amount },
    }),
};
