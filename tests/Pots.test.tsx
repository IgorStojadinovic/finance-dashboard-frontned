import { describe, it, vi, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Pots from '../src/components/pages/ports/Pots';

vi.mock('../src/lib/hooks/useGetUser', () => ({
  useUserId: () => 'user-1',
}));

vi.mock('../src/lib/hooks/usePots', () => ({
  usePots: () => ({
    data: [
      {
        id: 'pot-1',
        userId: 'user-1',
        name: 'Savings',
        target: 2000,
        total: 159,
        hex: '#82c9d7',
        theme: 'cyan',
        progressBar: '8%',
      },
      {
        id: 'pot-2',
        userId: 'user-1',
        name: 'Concert Ticket',
        target: 150,
        total: 110,
        hex: '#f2cdac',
        theme: 'yellow',
        progressBar: '73%',
      },
    ],
  }),
  useCreatePot: () => ({ mutate: vi.fn(), isPending: false }),
  useDeletePot: () => ({ mutate: vi.fn() }),
  useUpdatePot: () => ({ mutate: vi.fn() }),
}));

const renderPots = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Pots />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Pots Page', () => {
  it('renders the pot list from the API hook', () => {
    renderPots();

    expect(screen.getByRole('heading', { name: /^pots$/i })).toBeInTheDocument();
    const list = screen.getByRole('list', { name: /lista svih potova/i });
    expect(within(list).getByText('Savings')).toBeInTheDocument();
    expect(within(list).getByText('Concert Ticket')).toBeInTheDocument();
    expect(within(list).getByText('Total of 2000')).toBeInTheDocument();
    expect(within(list).getByText('Total of 150')).toBeInTheDocument();
  });

  it('shows add and withdraw actions for each pot', () => {
    renderPots();

    expect(screen.getAllByRole('button', { name: /\+ add money/i })).toHaveLength(
      2
    );
    expect(screen.getAllByRole('button', { name: /withdraw/i })).toHaveLength(2);
  });
});
