import { Pot } from '../lib/types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const potsApi = {
  getAll: (): Promise<Pot[]> =>
    fetch(`${API_BASE_URL}/pots`).then(res => res.json()),

  getById: (id: string): Promise<Pot> =>
    fetch(`${API_BASE_URL}/pots/${id}`).then(res => res.json()),

  getUserPots: (userId: string): Promise<Pot[]> =>
    fetch(`${API_BASE_URL}/pots/user/${userId.toString()}`).then(res =>
      res.json()
    ),

  create: (data: Omit<Pot, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetch(`${API_BASE_URL}/pots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<Pot>) =>
    fetch(`${API_BASE_URL}/pots/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string) =>
    fetch(`${API_BASE_URL}/pots/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),

  updateTotal: (id: string, amount: number) =>
    fetch(`${API_BASE_URL}/pots/${id}/total`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    }).then(res => res.json()),
};
