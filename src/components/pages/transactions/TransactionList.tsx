import React, { useMemo, useEffect } from 'react';
import { Transaction } from '../../../lib/types/types';
import { useTransactionStore } from '../../../lib/store/useTransactionStore.ts';
import { TransactionListProps } from './transactions.types';
import TransactionItem from './TransactionItem.tsx';
import Pagination from '../../../lib/pagination/Pagination.tsx';
import TransactionTable from './TransactionTable.tsx';

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  const {
    currentSort,
    currentCategory,
    searchInput,
    setDisabledSearch,
    currentPage,
    setCurrentPage,
    stateTransactions,
    setStateTransactions,
    pageSize,
  } = useTransactionStore();

  useEffect(() => {
    setStateTransactions(transactions);
  }, [transactions, setStateTransactions]);

  useEffect(() => {
    if (currentPage > 1) {
      setDisabledSearch(true);
    } else {
      setDisabledSearch(false);
    }
  }, [currentPage, setDisabledSearch]);

  const filteredAndSortedTransactions: Transaction[] = useMemo(() => {
    let filtered = stateTransactions.filter(obj =>
      obj.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (currentCategory !== 'all transactions') {
      filtered = filtered.filter(
        transaction => transaction.category.toLowerCase() === currentCategory
      );
    }

    switch (currentSort) {
      case 'latest':
        return filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case 'oldest':
        return filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case 'a-z':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'highest':
        return filtered.sort((a, b) => b.amount - a.amount);
      case 'lowest':
        return filtered.sort((a, b) => a.amount - b.amount);
      default:
        return filtered;
    }
  }, [stateTransactions, searchInput, currentSort, currentCategory]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredAndSortedTransactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredAndSortedTransactions, pageSize]);

  return (
    <>
      <section
        className='pt-6 flex flex-1 flex-col h-full justify-between gap-6 xl:hidden md:hidden'
        data-testid='mobile-transaction-list'
        aria-label='Transaction list for mobile devices'
      >
        <ul>
          {currentTableData.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <li>
                <TransactionItem transaction={transaction} />
              </li>
              {index !== currentTableData.length - 1 && (
                <li className='py-4' role='separator'>
                  <hr className='w-full h-px bg-grey-100' />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </section>

      <section
        className='w-full justify-center hidden md:flex md:flex-1'
        data-testid='desktop-transaction-list'
        aria-label='Transaction list for desktop'
      >
        <article className='w-full'>
          <TransactionTable currentTableData={currentTableData} />
        </article>
      </section>

      <nav
        aria-label='Transactions pagination'
        data-testid='transactions-pagination'
      >
        <Pagination
          currentPage={currentPage}
          totalCount={filteredAndSortedTransactions.length}
          pageSize={pageSize}
          siblingCount={1}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </nav>
    </>
  );
}
