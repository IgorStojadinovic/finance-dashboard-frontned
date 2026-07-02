import { cn } from '../../../lib/utils';
import { BillsProps, RecurringBillSummary } from './home.types';
import SectionHeader from './SectionHeader';

export default function Bills({ billsData }: BillsProps) {
  const SlicedBillsData = billsData?.slice(0, 3);
  return (
    <section
      className='bg-white rounded-lg py-6 px-5 flex flex-col gap-8 justify-between'
      aria-labelledby='recurring-bills-title'
      data-testid='recurring-bills-section'
    >
      <SectionHeader
        title='Recurring Bills'
        link='/dashboard/recurring'
        linkText='see details'
      />

      <ul className='flex flex-col gap-6' aria-label='Bills summary'>
        {SlicedBillsData?.map(bill => (
          <BillItem key={bill.category} {...bill} />
        ))}
      </ul>
    </section>
  );
}

function BillItem({ category, amount, color }: RecurringBillSummary) {
  return (
    <li
      className='bg-beige-100 py-5 px-4 rounded-lg flex justify-between border-l-4'
      style={{ borderLeftColor: color }}
    >
      <span className='text-preset-4 capitalize'>{category}</span>
      <span className='text-preset-4-bold' data-testid='paid-bills-amount'>
        {amount}$
      </span>
    </li>
  );
}
