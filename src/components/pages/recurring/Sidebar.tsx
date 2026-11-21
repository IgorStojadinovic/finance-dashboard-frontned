import RecitIcon from '../../../assets/images/icon-nav-recurring-bills.svg';
import { billTiming } from '../../../lib/recurringBillStatus';
import { RecurringBill } from '../../../lib/types/types';
import { formatMoney } from '../../../lib/utils';

function sum(bills: RecurringBill[]) {
  return bills.reduce((total, bill) => total + bill.amount, 0);
}

function countAndTotal(bills: RecurringBill[]) {
  return `${bills.length}(${formatMoney(sum(bills))})`;
}

export const Sidebar = ({ bills }: { bills: RecurringBill[] }) => {
  const paid = bills.filter(bill => billTiming(bill) === 'paid');
  const dueSoon = bills.filter(bill => billTiming(bill) === 'due');
  const upcoming = bills.filter(bill => billTiming(bill) === 'upcoming');

  return (
    <article className='xl:w-1/2 flex flex-col gap-5 w-full md:flex-row xl:flex-col'>
      <section
        className='flex items-center bg-grey-900 text-white rounded-lg p-5 py-6 md:flex-1 xl:h-1/2 xl:grow-0'
        role='contentinfo'
        aria-label='Total bills'
      >
        <img src={RecitIcon} alt='Recit Icon' className='w-10 mr-5' />
        <div className='flex flex-col gap-2'>
          <h2 className='text-preset-4'>Total bills</h2>
          <span className='text-preset-1' data-testid='total-bills-amount'>
            {formatMoney(sum(bills))}
          </span>
        </div>
      </section>
      <section
        className='flex flex-col bg-white p-5 rounded-lg gap-5 md:flex-1 xl:h-1/2 xl:grow-0'
        role='region'
        aria-label='Summary'
      >
        <h2 className='text-preset-3'>Summary</h2>
        <ul>
          <li className='flex justify-between pb-4 border-b-2 border-b-grey-100'>
            <p>Paid Bills</p>
            <p>{countAndTotal(paid)}</p>
          </li>
          <li className='flex justify-between py-4 border-b-2 border-b-grey-100'>
            <p>Total Upcoming</p>
            <p>{countAndTotal(upcoming)}</p>
          </li>
          <li className='flex justify-between pt-4 text-red'>
            <p>Due Soon</p>
            <p>{countAndTotal(dueSoon)}</p>
          </li>
        </ul>
      </section>
    </article>
  );
};
