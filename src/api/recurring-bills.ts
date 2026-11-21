import { RecurringBill } from '../lib/types/types';
import { apiFetch } from './client';

export const recurringBillsApi = {
  getAll: () => apiFetch<RecurringBill[]>('/recurring-bills'),

  getById: (id: string) => apiFetch<RecurringBill>(`/recurring-bills/${id}`),

  getUserBills: (userId: string) =>
    apiFetch<RecurringBill[]>(`/recurring-bills/user/${userId}`),

  getByStatus: (userId: string, status: RecurringBill['status']) =>
    apiFetch<RecurringBill[]>(
      `/recurring-bills/user/${userId}/status/${status}`
    ),

  getByMonth: (userId: string, year: number, month: number) =>
    apiFetch<RecurringBill[]>(
      `/recurring-bills/user/${userId}/month/${year}/${month}`
    ),

  create: (data: Omit<RecurringBill, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiFetch<RecurringBill>('/recurring-bills', { method: 'POST', body: data }),

  update: (id: string, data: Partial<RecurringBill>) =>
    apiFetch<RecurringBill>(`/recurring-bills/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id: string) =>
    apiFetch<void>(`/recurring-bills/${id}`, { method: 'DELETE' }),
};
