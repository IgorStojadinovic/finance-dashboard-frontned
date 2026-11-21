import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/16/solid';
import { billTiming } from '../../../lib/recurringBillStatus';
import { RecurringBill } from '../../../lib/types/types';
import { formatMoney } from '../../../lib/utils';

function DueIcon({ paid, dueSoon }: { paid: boolean; dueSoon: boolean }) {
  if (paid) return <CheckCircleIcon className='fill-green h-4' />;
  if (dueSoon) return <ExclamationCircleIcon className='fill-red h-4' />;
  return null;
}

function dueLabel(bill: RecurringBill) {
  return new Date(bill.orderDate ?? bill.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function TableRow({
  item,
  index,
}: {
  item: RecurringBill;
  index: number;
}) {
  const timing = billTiming(item);
  const paid = timing === 'paid';
  const dueSoon = timing === 'due';
  const label = dueLabel(item);
  const dateClass = dueSoon
    ? 'text-preset-4 capitalize text-red'
    : 'text-preset-4 capitalize text-green';

  return (
    <tr
      className='border-b border-grey-100 last:border-b-0'
      data-testid={`bill-item-${index}`}
    >
      <th className='py-5 flex flex-col gap-2 md:flex-row w-full md:flex md:justify-between'>
        <div className='flex items-center gap-4 md:w-1/3'>
          <span
            className='rounded-full h-8 w-8 shrink-0'
            style={{ backgroundColor: item.color || '#b3b3b3' }}
            aria-hidden='true'
          />
          <h3 className='text-preset-4-bold capitalize'>{item.name}</h3>
        </div>
        <div className='items-center gap-3 md:flex hidden'>
          <span className={dateClass}>{label}</span>
          <DueIcon paid={paid} dueSoon={dueSoon} />
        </div>
        <div className='flex items-center justify-between md:w-1/3 md:justify-end'>
          <div className='flex items-center gap-3 md:hidden'>
            <span className={dateClass}>{label}</span>
            <DueIcon paid={paid} dueSoon={dueSoon} />
          </div>
          <span
            className={
              paid
                ? 'text-green text-preset-4-bold'
                : 'text-grey-900 text-preset-4-bold text-center'
            }
          >
            {formatMoney(item.amount)}
          </span>
        </div>
      </th>
    </tr>
  );
}
