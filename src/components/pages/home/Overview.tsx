import { OverviewProps } from './home.types';

export default function Overview({ currentBalance }: OverviewProps) {
  const balance = currentBalance?.[0];

  if (!balance) {
    return (
      <section className='block-wapper xl:flex xl:flex-col gap-6' data-testid='overview-section'>
        <h1 className='text-preset-1' id='overview-title'>Overview</h1>
        <p>Loading balance...</p>
      </section>
    );
  }

  return (
    <section
      className='block-wapper xl:flex xl:flex-col gap-6'
      data-testid='overview-section'
    >
      <h1 className='text-preset-1' id='overview-title'>
        Overview
      </h1>
      <section
        className='flex flex-col gap-3 md:flex-row md:gap-6 xl:w-full xl:col-span-2'
        aria-labelledby='overview-title'
      >
        <article
          className='bg-grey-900 flex flex-col gap-3 text-white rounded-lg p-5 flex-1'
          aria-labelledby='current-balance-title'
        >
          <h3 id='current-balance-title' className='text-preset-4'>
            Current Balance
          </h3>
          <span className='text-preset-1' data-testid='current-balance-amount'>
            {balance.balance}$
          </span>
        </article>
        <article
          className='bg-white flex flex-col gap-3 text-grey-900 rounded-lg p-5 flex-1'
          aria-labelledby='income-title'
        >
          <h3 id='income-title' className='text-preset-4'>
            Income
          </h3>
          <span className='text-preset-1' data-testid='income-amount'>
            {balance.income}$
          </span>
        </article>
        <article
          className='bg-white flex flex-col gap-3 text-grey-900 rounded-lg p-5 flex-1'
          aria-labelledby='expenses-title'
        >
          <h3 id='expenses-title' className='text-preset-4'>
            Expenses
          </h3>
          <span className='text-preset-1' data-testid='expenses-amount'>
            {balance.expenses}$
          </span>
        </article>
      </section>
    </section>
  );
}
