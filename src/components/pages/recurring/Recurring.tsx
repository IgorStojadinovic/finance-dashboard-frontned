import { Sidebar } from './Sidebar';
import Table from './Table';
import { useUserId } from '../../../lib/hooks/useGetUser';
import { useUserRecurringBills } from '../../../lib/hooks/useRecurringBills';
import { Spinner } from '../../../ui/Spinner';

const RecurringBills = () => {
  const userId = useUserId();
  const { data: bills, isLoading, isError } = useUserRecurringBills(
    userId ?? ''
  );

  return (
    <main
      className='w-full bg-beige-100 py-6 px-4 md:px-10 md:py-8 xl:px-10 gap-8 xl:gap-8 flex flex-col'
      data-testid='recurring-bills-page'
    >
      <h1 className='text-preset-1' aria-label='Recurring Bills'>
        Recurring Bills
      </h1>
      {!userId && <p>Sign in to see your recurring bills.</p>}
      {userId && isLoading && <Spinner />}
      {userId && isError && <p>Could not load recurring bills.</p>}
      {bills && (
        <section className='flex flex-col gap-3 md:flex-wrap md:flex-row md:gap-6 h-full'>
          <Sidebar bills={bills} />
          <Table bills={bills} />
        </section>
      )}
    </main>
  );
};

export default RecurringBills;
