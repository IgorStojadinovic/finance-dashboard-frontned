import { BudgetCard } from './BudgetCard.tsx';
import { BudgetChart } from './BudgetChart.tsx';
import { useBudgets } from '../../../lib/hooks/useBudgets';
import { useBudgetStore } from '../../../lib/store/useBudgetStore.ts';
import { useEffect } from 'react';
import { useUserId } from '../../../lib/hooks/useGetUser.ts';
import { PageHeder } from '../../../ui';
import { AddNewModal } from '../../modals/budget/AddNewModal.tsx';
import { Spinner } from '../../../ui/Spinner';

const Budget = () => {
  const userId = useUserId();
  const { data: budgets } = useBudgets(userId);
  const { setStoreBudgets } = useBudgetStore();

  useEffect(() => {
    if (budgets) {
      setStoreBudgets(() => budgets);
    }
  }, [budgets, setStoreBudgets]);

  if (!budgets) {
    return <Spinner />;
  }

  return (
    <div className='bg-beige-100 relative overflow-y-scroll px-4 py-6 md:px-10 md:py-8 xl:flex-1'>
      <PageHeder title='Budgets'>
        <AddNewModal type='budget' />
      </PageHeder>
      <section className='mt-8 flex flex-col gap-6 xl:flex-row'>
        <BudgetChart />
        <BudgetCard />
      </section>
    </div>
  );
};

export default Budget;
