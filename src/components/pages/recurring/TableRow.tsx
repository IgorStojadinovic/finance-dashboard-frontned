import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/16/solid';

type UserRecurringBillsOBJ = {
  name: string;
  amount: string;
  icon: string;
  order: string;
  status: string;
};

export default function TableRow({
  item,
  index,
}: {
  item: UserRecurringBillsOBJ;
  index: number;
}) {
  return (
    <tr
      className='border-b border-grey-100 last:border-b-0'
      key={index}
      data-testid={`bill-item-${index}`}
    >
      <th className='py-5 flex flex-col gap-2 md:flex-row w-full md:flex md:justify-between'>
        <div className='flex items-center gap-4 md:w-1/3'>
          <img
            src={item.icon}
            className='rounded-full h-8'
            alt={`${item.name} icon`}
          />
          <h3 className='text-preset-4-bold capitalize'>{item.name}</h3>
        </div>
        <div className='items-center gap-3 md:flex hidden'>
          <span className='text-preset-4 capitalize text-green'>
            {item.order}
          </span>
          <CheckCircleIcon
            className={
              item.status === 'paid' ? 'fill-green h-4' : 'fill-red h-4'
            }
          />
        </div>
        <div className='flex items-center justify-between md:w-1/3 md:justify-end'>
          <div className='flex items-center gap-3 md:hidden'>
            <span className='text-preset-4 capitalize text-green'>
              {item.order}
            </span>
            <CheckCircleIcon
              className={
                item.status === 'paid' ? 'fill-green h-4' : 'fill-red h-4'
              }
            />
          </div>
          <span
            className={
              item.status === 'paid'
                ? 'text-green text-preset-4-bold'
                : 'text-grey-900 text-preset-4-bold text-center'
            }
          >
            {item.amount}
          </span>
        </div>
      </th>
    </tr>
  );
}
