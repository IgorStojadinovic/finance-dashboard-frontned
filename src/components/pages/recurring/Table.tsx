import { useMemo, useState } from 'react';
import TableRow from './TableRow';
import TableNav from './TableNav';
import { RecurringBill } from '../../../lib/types/types';

export default function Table({ bills }: { bills: RecurringBill[] }) {
  const [currentSort, setCurrentSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedBills = useMemo(() => {
    const filtered = bills.filter(bill =>
      bill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered];
    switch (currentSort) {
      case 'latest':
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case 'oldest':
        return sorted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case 'highest':
        return sorted.sort((a, b) => b.amount - a.amount);
      case 'lowest':
        return sorted.sort((a, b) => a.amount - b.amount);
      case 'a-z':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [bills, currentSort, searchQuery]);

  return (
    <section
      className='flex flex-col bg-white p-5 rounded-lg gap-5 w-full xl:flex-1 h-full'
      role='region'
      aria-label='Bills List'
    >
      <TableNav
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <table>
        <thead>
          <tr className='hidden md:flex justify-between text-preset-5 text-grey-300'>
            <th className='flex-1 text-left'>Bill Title</th>
            <th className='flex-1 text-left'>Due Date</th>
            <th className='text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedBills.map((item, index) => (
            <TableRow key={item.id} item={item} index={index} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
