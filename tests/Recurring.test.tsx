import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import RecurringBills from '../src/components/pages/recurring/Recurring';
import { userRecurringBills } from '../src/lib/lits';
import { BrowserRouter } from 'react-router-dom';

// Polyfill for ResizeObserver
(globalThis as any).ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RecurringBills Component', () => {
  it('renders the main structure correctly', () => {
    renderWithRouter(<RecurringBills />);

    // Check if main element is present
    const mainElement = screen.getByTestId('recurring-bills-page');
    expect(mainElement).toBeInTheDocument();

    // Check if the main heading is present
    const heading = screen.getByRole('heading', { name: /recurring bills/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders total bills section with correct information', () => {
    render(<RecurringBills />);

    // Check if total bills section is present
    const totalBillsSection = screen.getByRole('contentinfo', {
      name: /total bills/i,
    });
    expect(totalBillsSection).toBeInTheDocument();

    // Check if total amount is correct
    const totalAmount = within(totalBillsSection).getByText('$384.98');
    expect(totalAmount).toBeInTheDocument();
  });

  it('renders summary section with correct details', () => {
    render(<RecurringBills />);

    // Check if summary section is present
    const summarySection = screen.getByRole('region', { name: /summary/i });
    expect(summarySection).toBeInTheDocument();

    // Check for summary details
    expect(within(summarySection).getByText('Paid Bills')).toBeInTheDocument();
    expect(within(summarySection).getByText('2($320.00)')).toBeInTheDocument();
    expect(
      within(summarySection).getByText('Total Upcoming')
    ).toBeInTheDocument();
    expect(
      within(summarySection).getByText('6($1,220.00)')
    ).toBeInTheDocument();
    expect(within(summarySection).getByText('Due Soon')).toBeInTheDocument();
    expect(within(summarySection).getByText('2($40.00)')).toBeInTheDocument();
  });

  it('renders search input and sort button', () => {
    render(<RecurringBills />);

    // Check if search input is present
    const searchInput = screen.getByPlaceholderText('Search bills');
    expect(searchInput).toBeInTheDocument();

    // Check if sort button is present
    const sortButton = screen.getByTestId('sort-bills-button');
    expect(sortButton).toBeInTheDocument();
  });

  it('renders bills list with correct items', () => {
    render(<RecurringBills />);

    // Check if bills list section is present
    const billsListSection = screen.getByRole('region', {
      name: /bills list/i,
    });
    expect(billsListSection).toBeInTheDocument();

    // Check for each bill item
    userRecurringBills.forEach((bill, index) => {
      const billItem = screen.getByTestId(`bill-item-${index}`);
      expect(billItem).toBeInTheDocument();
      expect(within(billItem).getByText(bill.name)).toBeInTheDocument();
      expect(within(billItem).getByText(bill.amount)).toBeInTheDocument();
    });
  });

  it('measures render time', () => {
    const start = performance.now();
    renderWithRouter(<RecurringBills />);
    const end = performance.now();
    const renderTime = end - start;
    console.log(`Render time: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(100); // Adjust the threshold as needed
  });
});
