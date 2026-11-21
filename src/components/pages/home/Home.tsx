import { useGetUser, useUserId } from '../../../lib/hooks/useGetUser';
import { Spinner } from '../../../ui/Spinner';
import Overview from './Overview';
import Posts from './Posts';
import Budgets from './Budgets';
import Bills from './Bills';

const Home = () => {
  const userId = useUserId();
  const { user, isLoading, error } = useGetUser(userId);

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !user) {
    return (
      <main className='bg-beige-100 p-8' data-testid='home-page' role='main'>
        <p>Could not load your overview.</p>
      </main>
    );
  }

  return (
    <main
      className='bg-beige-100 flex flex-col justify-between xl:flex-row xl:justify-normal xl:flex-1'
      data-testid='home-page'
      role='main'
    >
      <section className='flex flex-col w-full gap-6 px-4 py-6 md:p-8 xl:h-dvh'>
        <Overview currentBalance={user.balance} />
        <article className='block-container flex flex-col lg:flex-row xl:gap-6 flex-1'>
          <Posts
            potsData={user.pots}
            isLoading={false}
            transactionsData={user.transactions}
          />
          <section className='block-wapper flex flex-col xl:w-1/2 gap-6'>
            <Budgets budgetsData={user.budgets} isLoading={isLoading} />
            <Bills billsData={user.recurringBills} />
          </section>
        </article>
      </section>
    </main>
  );
};

export default Home;
