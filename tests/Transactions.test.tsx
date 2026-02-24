import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Transactions from '../src/components/pages/transactions/Transactions';
import { categoriesMenu, sortMenu } from '../src/lib/lits';
import React from 'react';

// Polyfill for ResizeObserver
(globalThis as any).ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
// Definišemo interfejs za opcije
interface MenuOption {
  name: string;
  description: string;
}

// Mock the TransactionList component
vi.mock('./transaction_list.tsx', () => ({
  default: ({
    transactions,
    sortBy,
    sortByCategory,
    searchFor,
    setInputDisabled,
  }: {
    transactions: Array<{
      id: number;
      name: string;
      category: string;
      amount: string;
      date: string;
      icon: string;
      usd: number;
    }>;
    sortBy: string;
    sortByCategory: string;
    searchFor: string;
    setInputDisabled: (isDisabled: boolean) => void;
  }) => (
    <div data-testid='mocked-transaction-list'>
      <div data-testid='sort-value'>{sortBy}</div>
      <div data-testid='category-value'>{sortByCategory}</div>
      <div data-testid='search-value'>{searchFor}</div>
      <div data-testid='transactions-count'>{transactions.length}</div>
      <button
        data-testid='disable-input-btn'
        onClick={() => setInputDisabled(true)}
      >
        Disable Input
      </button>
    </div>
  ),
}));

// Mock the transactions data
vi.mock('../../lib/transactions.ts', () => ({
  default: [
    {
      id: 1,
      name: 'Test Transaction 1',
      category: 'entertainment',
      amount: '+$100.00',
      date: '2023-09-15',
      icon: 'test-icon.svg',
      usd: 100,
    },
    {
      id: 2,
      name: 'Test Transaction 2',
      category: 'bills',
      amount: '-$50.00',
      date: '2023-09-16',
      icon: 'test-icon.svg',
      usd: 50,
    },
    {
      id: 3,
      name: 'Test Transaction 3',
      category: 'dining out',
      amount: '-$75.00',
      date: '2023-09-17',
      icon: 'test-icon.svg',
      usd: 75,
    },
  ],
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Transactions Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders transactions page with correct elements', () => {
    renderWithRouter(<Transactions />);

    // Check main elements are rendered
    expect(screen.getByTestId('transactions-page')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-search-input')).toBeInTheDocument();
    expect(screen.getByTestId('sort-menu-button')).toBeInTheDocument();
    expect(screen.getByTestId('category-menu-button')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-transaction-list')).toBeInTheDocument();
  });

  it('updates search input and passes value to transaction list', () => {
    renderWithRouter(<Transactions />);

    const searchInput = screen.getByTestId('transaction-search-input');
    fireEvent.change(searchInput, { target: { value: 'LCC' } });

    // Check that the search value is passed to the transaction list
    expect(searchInput).toHaveValue('LCC');
  });

  it('opens the sort menu and displays all options', async () => {
    renderWithRouter(<Transactions />);

    // Click sort button
    const sortButton = screen.getByTestId('sort-menu-button');
    fireEvent.click(sortButton);

    // Wait for menu to appear
    await waitFor(() => {
      const sortOptions = screen.getByTestId('sort-menu-items');
      expect(sortOptions).toBeInTheDocument();
    });

    // Check if all sort options are present
    sortMenu.forEach((option: MenuOption) => {
      expect(screen.getByText(option.description)).toBeInTheDocument();
    });
  });

  it('selects a sort option and updates the sort value', async () => {
    renderWithRouter(<Transactions />);

    // Open sort menu
    const sortButton = screen.getByTestId('sort-menu-button');
    fireEvent.click(sortButton);

    // Wait for menu to appear
    await waitFor(() => {
      const sortOptions = screen.getByTestId('sort-menu-items');
      expect(sortOptions).toBeInTheDocument();
    });

    // Find and click a specific sort option
    const oldestOption = screen.getByText('Oldest');
    fireEvent.click(oldestOption);

    // Check that sort value was updated
    expect(screen.getByTestId('sort-value')).toHaveTextContent('oldest');
  });

  it('opens the category menu and displays all options', async () => {
    renderWithRouter(<Transactions />);

    // Click category button
    const categoryButton = screen.getByTestId('category-menu-button');
    fireEvent.click(categoryButton);

    // Wait for menu to appear
    await waitFor(() => {
      const categoryOptions = screen.getByTestId('category-menu-items');
      expect(categoryOptions).toBeInTheDocument();
    });

    // Check if all category options are present
    categoriesMenu.forEach((option: MenuOption) => {
      expect(screen.getByText(option.description)).toBeInTheDocument();
    });
  });

  it('selects a category option and updates the category value', async () => {
    renderWithRouter(<Transactions />);

    // Check initial category value
    expect(screen.getByTestId('category-value')).toHaveTextContent(
      'all transactions'
    );

    // Open category menu
    const categoryButton = screen.getByTestId('category-menu-button');
    fireEvent.click(categoryButton);

    // Wait for menu to appear
    await waitFor(() => {
      const categoryOptions = screen.getByTestId('category-menu-items');
      expect(categoryOptions).toBeInTheDocument();
    });

    // Find and click a specific category option (assuming we have an "Entertainment" option)
    const entertainmentOption = screen.getByText('Entertainment');
    fireEvent.click(entertainmentOption);

    // Check that category value was updated (using the lowercase version as stored in state)
    expect(screen.getByTestId('category-value')).toHaveTextContent(
      'entertainment'
    );
  });
  /*
  it("closes the sort menu when opening category menu", async () => {
    renderWithRouter(<Transactions />);
    
    // Open sort menu first
    const sortButton = screen.getByTestId("sort-menu-button");
    fireEvent.click(sortButton);
    
    // Verify sort menu is open
    await waitFor(() => {
      expect(screen.getByTestId("sort-menu-items")).toBeInTheDocument();
    });
    
    // Now open category menu
    const categoryButton = screen.getByTestId("category-menu-button");
    fireEvent.click(categoryButton);
    
    // Verify sort menu is closed and category menu is open
    await waitFor(() => {
      expect(screen.queryByTestId("sort-menu-items")).not.toBeInTheDocument();
      expect(screen.getByTestId("category-menu-items")).toBeInTheDocument();
    });
  });

  it("passes correct initial props to transaction list", () => {
    renderWithRouter(<Transactions />);
    
    // Check initial props passed to TransactionList
    expect(screen.getByTestId("sort-value")).toHaveTextContent("latest");
    expect(screen.getByTestId("category-value")).toHaveTextContent("all transactions");
    expect(screen.getByTestId("search-value")).toHaveTextContent("");
    expect(screen.getByTestId("transactions-count")).toHaveTextContent("3"); // As per our mock
  }); */
});
