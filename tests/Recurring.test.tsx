import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import RecurringBills from '../src/components/pages/recurring/Recurring';

vi.mock('../src/lib/hooks/useGetUser', () => ({
  useUserId: () => 'user-1',
}));

vi.mock('../src/lib/hooks/useRecurringBills', () => {
  return {
    useUserRecurringBills: () => ({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 'bill-1',
          userId: 'user-1',
          name: 'Elevate Education',
          amount: 250,
          status: 'paid',
          date: '2026-01-15',
          orderDate: '2026-01-01',
          category: 'education',
          color: '#277c78',
        },
        {
          id: 'bill-2',
          userId: 'user-1',
          name: 'Delta Taxi',
          amount: 40,
          status: 'open',
          date: '2026-02-13',
          orderDate: '2026-02-13',
          category: 'transport',
          color: '#f2cdac',
        },
        {
          id: 'bill-3',
          userId: 'user-1',
          name: 'Juliet Restaurant',
          amount: 100,
          status: 'open',
          date: '2026-03-20',
          orderDate: '2026-03-20',
          category: 'dining',
          color: '#c94736',
        },
      ],
    }),
  };
});

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 10, 10, 12));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('RecurringBills Component', () => {
  it('renders the heading and a bill row', () => {
    render(<RecurringBills />);

    expect(screen.getByTestId('recurring-bills-page')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /recurring bills/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search bills')).toBeInTheDocument();
    expect(screen.getByTestId('sort-bills-button')).toBeInTheDocument();

    expect(screen.getByText('Elevate Education')).toBeInTheDocument();
    expect(screen.getByText('$250.00')).toBeInTheDocument();
  });

  it('summarizes paid, upcoming, and due soon bills', () => {
    render(<RecurringBills />);

    const total = screen.getByRole('contentinfo', { name: /total bills/i });
    expect(within(total).getByTestId('total-bills-amount')).toHaveTextContent(
      '$390.00'
    );

    const summary = screen.getByRole('region', { name: /summary/i });
    expect(within(summary).getByText('Paid Bills')).toBeInTheDocument();
    expect(within(summary).getByText('1($250.00)')).toBeInTheDocument();
    expect(within(summary).getByText('Total Upcoming')).toBeInTheDocument();
    expect(within(summary).getByText('1($100.00)')).toBeInTheDocument();
    expect(within(summary).getByText('Due Soon')).toBeInTheDocument();
    expect(within(summary).getByText('1($40.00)')).toBeInTheDocument();
  });
});
