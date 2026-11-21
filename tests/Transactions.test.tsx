import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Transactions from '../src/components/pages/transactions/Transactions';

vi.mock('../src/lib/hooks/useGetUser', () => ({
  useUserId: () => 'user-1',
}));

const transactions = vi.hoisted(() => [
  {
    id: 't1',
    userId: 'user-1',
    name: 'Emma Richardson',
    amount: 75.5,
    date: '2026-11-01',
    category: 'General',
    recurring: false,
    status: 'completed',
    image: 'avatar.jpg',
  },
]);

vi.mock('../src/lib/hooks/useTransactions', () => ({
  useTransactions: () => ({
    isLoading: false,
    data: transactions,
  }),
}));

const renderTransactions = () =>
  render(
    <BrowserRouter>
      <Transactions />
    </BrowserRouter>
  );

describe('Transactions Page', () => {
  it('renders the page, search field, and a transaction', () => {
    renderTransactions();

    expect(screen.getByTestId('transactions-page')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /transactions/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('transaction-search-input')).toBeInTheDocument();
    expect(screen.getAllByTestId('sort-menu-button')).toHaveLength(2);
    expect(screen.getAllByTestId('transaction-t1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Emma Richardson').length).toBeGreaterThan(0);
  });

  it('updates the search input', async () => {
    const user = userEvent.setup();
    renderTransactions();

    const searchInput = screen.getByTestId('transaction-search-input');
    await user.type(searchInput, 'Emma');

    expect(searchInput).toHaveValue('Emma');
  });
});
