import { describe, it, vi, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/components/pages/home/Home';

vi.mock('../src/ui/Chart', () => ({
  Chart: () => <div data-testid='mocked-chart' />,
}));

vi.mock('../src/lib/hooks/useGetUser', () => ({
  useUserId: () => 'user-1',
  useGetUser: () => ({
    isLoading: false,
    error: null,
    user: {
      id: 'user-1',
      name: 'Ada',
      balance: [{ balance: 4860, income: 3814.25, expenses: 1700.5 }],
      pots: [
        {
          id: 'p1',
          name: 'Savings',
          total: 159,
          hex: '#82c9d7',
        },
      ],
      budgets: [
        {
          category: 'Entertainment',
          spent: 15,
          spending_limit: 50,
          hex: '#277c78',
          latest_spending: [],
        },
      ],
      recurringBills: [
        {
          category: 'paid bills',
          amount: 190,
          color: '#277c78',
        },
      ],
      transactions: [
        {
          id: 't1',
          name: 'Emma Richardson',
          amount: 75,
          date: '2026-11-01',
          image: 'avatar.jpg',
        },
      ],
    },
  }),
}));

const renderHome = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

describe('Home Page', () => {
  it('renders the overview balances from the signed-in user', () => {
    renderHome();

    expect(
      screen.getByRole('heading', { name: /overview/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('current-balance-amount')).toHaveTextContent(
      '4860$'
    );
    expect(screen.getByTestId('income-amount')).toHaveTextContent('3814.25$');
    expect(screen.getByTestId('expenses-amount')).toHaveTextContent('1700.5$');
  });

  it('renders the budget chart and pots section', () => {
    renderHome();

    expect(screen.getByTestId('mocked-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pots-section')).toHaveClass(
      'bg-white',
      'rounded-lg'
    );
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByTestId('total-saved-amount')).toHaveTextContent('159 $');
  });

  it('links recurring bills and transactions to their pages', () => {
    renderHome();

    const bills = screen.getByTestId('recurring-bills-section');
    expect(within(bills).getByText('see details')).toHaveAttribute(
      'href',
      '/dashboard/recurring'
    );
    expect(within(bills).getByText('paid bills')).toBeInTheDocument();

    const transactions = screen.getByTestId('transactions-section');
    expect(within(transactions).getByText('view all')).toHaveAttribute(
      'href',
      '/dashboard/transactions'
    );
    expect(within(transactions).getByText('Emma Richardson')).toBeInTheDocument();
    expect(
      within(transactions).getByRole('list', { name: 'Recent transactions' })
    ).toBeInTheDocument();
  });

  it('exposes the main page landmarks', () => {
    renderHome();

    expect(screen.getByTestId('home-page')).toHaveAttribute('role', 'main');
    expect(screen.getByTestId('overview-section')).toBeInTheDocument();
    expect(screen.getByTestId('budgets-section')).toBeInTheDocument();
  });
});
