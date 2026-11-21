import { sortMenu, categoriesMenu } from '../../../lib/lits.ts';
import { useTransactionStore } from '../../../lib/store/useTransactionStore.ts';
import { useUserId } from '../../../lib/hooks/useGetUser.ts';
import { useTransactions } from '../../../lib/hooks/useTransactions.ts';
import { Heading } from '../../../ui/Heading';
import { Spinner } from '../../../ui/Spinner';
import { SearchBar } from '../../../ui/SearchBar';
import { useEffect } from 'react';
import TransactionList from './TransactionList.tsx';
import TransactionDropdown from './TransactionDropdown.tsx';

const Transactions = () => {
  const {
    currentSort,
    setCurrentSort,
    currentCategory,
    setCurrentCategory,
    searchInput,
    disabledSearch,
    handleSearch,
    setSearchInput,
  } = useTransactionStore();

  const userId = useUserId();
  const { data: transactions, isLoading } = useTransactions(userId);

  useEffect(() => {
    setSearchInput('');
  }, [setSearchInput]);

  if (isLoading) return <Spinner />;

  return (
    <main
      className='bg-beige-100 px-4 py-6 flex md:h-screen w-full flex-col gap-8 xl:gap-2 md:px-10 md:py-8'
      data-testid='transactions-page'
      role='main'
    >
      <Heading>Transactions</Heading>
      <section
        className='bg-white rounded-lg px-5 py-6 flex flex-1 flex-col gap-6'
        aria-labelledby='transactions-title'
        data-testid='transactions-section'
      >
        <header className='flex items-center justify-between gap-6 relative'>
          <SearchBar
            disabledSearch={disabledSearch}
            searchInput={searchInput}
            handleSearch={handleSearch}
            placeholder='Search transactions'
          />
          <nav
            className='h-full flex gap-6 justify-end items-center'
            aria-label='Transaction filters'
          >
            <TransactionDropdown
              currentSort={currentSort}
              dropdownarray={sortMenu}
              setSort={setCurrentSort}
            />

            <TransactionDropdown
              currentSort={currentCategory}
              dropdownarray={categoriesMenu}
              setSort={setCurrentCategory}
            />
          </nav>
        </header>
        {transactions && <TransactionList transactions={transactions} />}
      </section>
    </main>
  );
};

export default Transactions;
