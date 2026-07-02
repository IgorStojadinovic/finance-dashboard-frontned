import TransactionItem from './TransactionItem';
import React from 'react';
import { TabGroup, Tab, TabList, TabPanels, TabPanel } from '@headlessui/react';
import { TransactionTableProps } from './transactions.types';

export default function TransactionTable({
  currentTableData,
}: TransactionTableProps) {
  return (
    <TabGroup>
      <TabList className='flex justify-between my-6 text-preset-5 text-grey-500'>
        <Tab className='w-2/4 text-left capitalize' data-testid='recipient-tab'>
          recipient/sender
        </Tab>
        <Tab className='w-1/4 capitalize' data-testid='category-tab'>
          category
        </Tab>
        <Tab className='w-1/4 capitalize' data-testid='date-tab'>
          transaction date
        </Tab>
        <Tab className='w-1/4 capitalize' data-testid='amount-tab'>
          amount
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ul aria-label='Transaction items'>
            {currentTableData.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                <li data-testid={`transaction-item-${transaction.id}`}>
                  <TransactionItem transaction={transaction} />
                </li>
                {index !== currentTableData.length - 1 && (
                  <li className='py-4' role='separator'>
                    <hr className='w-full h-px border-0 border-t border-grey-100' />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
