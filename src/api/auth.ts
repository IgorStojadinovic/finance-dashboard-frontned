import { ApiResponse, User } from '../lib/types/types';
import { apiFetch } from './client';

interface AuthData {
  token: string;
  user: User;
}

export type AuthResponse = ApiResponse<AuthData>;

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: data,
      auth: false,
    }),

  login: (data: { email: string; password: string }) =>
    apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: data,
      auth: false,
    }),

  logout: () => apiFetch<void>('/auth/logout', { method: 'POST' }),
};
