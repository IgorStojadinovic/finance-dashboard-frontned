import { RecurringBill } from '../lib/types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const recurringBillsApi = {
  getAll: (): Promise<RecurringBill[]> =>
    fetch(`${API_BASE_URL}/recurring-bills`).then(res => res.json()),

  getById: (id: string): Promise<RecurringBill> =>
    fetch(`${API_BASE_URL}/recurring-bills/${id}`).then(res => res.json()),

  getUserBills: (userId: string): Promise<RecurringBill[]> =>
    fetch(`${API_BASE_URL}/recurring-bills/user/${userId}`).then(res =>
      res.json()
    ),

  getByStatus: (
    userId: string,
    status: RecurringBill['status']
  ): Promise<RecurringBill[]> =>
    fetch(
      `${API_BASE_URL}/recurring-bills/user/${userId}/status/${status}`
    ).then(res => res.json()),

  getByMonth: (
    userId: string,
    year: number,
    month: number
  ): Promise<RecurringBill[]> =>
    fetch(
      `${API_BASE_URL}/recurring-bills/user/${userId}/month/${year}/${month}`
    ).then(res => res.json()),

  create: (data: Omit<RecurringBill, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetch(`${API_BASE_URL}/recurring-bills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<RecurringBill>) =>
    fetch(`${API_BASE_URL}/recurring-bills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string) =>
    fetch(`${API_BASE_URL}/recurring-bills/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};
