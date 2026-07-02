import {
  User,
  Transaction,
  Pot,
  Budget,
  RecurringBill,
  NewBudget,
} from '../lib/types/types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Users API
export const usersApi = {
  getUser: async (id: string): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await res.json();
    return data;
  },

  updateUser: (id: string, data: Partial<User>): Promise<User> =>
    fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
};

// Transactions API
export const transactionsApi = {
  getAll: (): Promise<Transaction[]> =>
    fetch(`${API_BASE_URL}/transactions`).then(res => res.json()),

  getById: (id: string): Promise<Transaction> =>
    fetch(`${API_BASE_URL}/transactions/${id}`).then(res => res.json()),

  create: (
    data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Transaction> =>
    fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<Transaction>): Promise<Transaction> =>
    fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string): Promise<void> =>
    fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),

  getTransactionsByUserId: (userId: string): Promise<Transaction[]> =>
    fetch(`${API_BASE_URL}/transactions/user/${userId}`).then(res =>
      res.json()
    ),

  sortByCategory: (category: string): Promise<Transaction[]> =>
    fetch(`${API_BASE_URL}/transactions/category/${category}`).then(res =>
      res.json()
    ),
};

// Pots API
export const potsApi = {
  getAll: (): Promise<Pot[]> =>
    fetch(`${API_BASE_URL}/pots`).then(res => res.json()),

  getById: (id: string): Promise<Pot> =>
    fetch(`${API_BASE_URL}/pots/${id}`).then(res => res.json()),

  getUserPots: (userId: string): Promise<Pot[]> =>
    fetch(`${API_BASE_URL}/pots/user/${userId}`).then(res => res.json()),

  create: (data: Omit<Pot, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pot> =>
    fetch(`${API_BASE_URL}/pots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<Pot>): Promise<Pot> =>
    fetch(`${API_BASE_URL}/pots/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string): Promise<void> =>
    fetch(`${API_BASE_URL}/pots/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),

  updateTotal: (id: string, amount: number): Promise<Pot> =>
    fetch(`${API_BASE_URL}/pots/${id}/total`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    }).then(res => res.json()),
};

// Budgets API
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

  create: (data: NewBudget): Promise<Budget> =>
    fetch(`${API_BASE_URL}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<Budget>): Promise<Budget> =>
    fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string): Promise<void> =>
    fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};

// Recurring Bills API
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

  create: (
    data: Omit<RecurringBill, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<RecurringBill> =>
    fetch(`${API_BASE_URL}/recurring-bills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<RecurringBill>): Promise<RecurringBill> =>
    fetch(`${API_BASE_URL}/recurring-bills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string): Promise<void> =>
    fetch(`${API_BASE_URL}/recurring-bills/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};

export * from './users';
export * from './transactions';
export * from './pots';
export * from './budgets';
export * from './recurring-bills';
export * from './auth';
