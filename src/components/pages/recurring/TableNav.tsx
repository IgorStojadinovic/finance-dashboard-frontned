import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import IconSort from '../../../assets/images/icon-sort.svg';
import { sortMenu } from '../../../lib/lits';
import React from 'react';

export default function TableNav({
  currentSort,
  setCurrentSort,
  searchQuery,
  setSearchQuery,
}: {
  currentSort: string;
  setCurrentSort: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <header className='flex items-center gap-6 md:justify-between'>
      <input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className='w-full py-3 px-5 h-full capitalize items-center ring-gray-400 justify-between rounded-md ring-1 focus:ring-1 focus:outline-none focus:bg-gray-50 md:w-1/2'
        placeholder='Search bills'
        aria-label='Search bills'
        data-testid='search-bills-input'
      />
      <Menu as='div' className='relative inline-block text-left'>
        <div className='flex items-center gap-3 text-preset-5 text-grey-500'>
          <p className='hidden md:block'>Sort by</p>
          <MenuButton
            className='inline-flex md:min-w-[100px] h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white md:px-3 md:py-2 text-sm font-semibold text-gray-900 md:shadow-sm md:ring-1 ring-inset ring-gray-400 hover:bg-gray-50'
            aria-label='Sort bills'
            data-testid='sort-bills-button'
          >
            <p className='hidden md:flex'>{currentSort}</p>
            <ChevronDownIcon
              aria-hidden='true'
              className='-mr-1 size-5 text-gray-400 hidden md:flex'
            />
            <img src={IconSort} className='h-6 w-6 md:hidden' alt='Icon Sort' />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className='absolute right-0 z-10 mt-8 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75 data-enter:ease-out data-leave:ease-in'
          aria-label='Sort options'
        >
          <div className='py-1'>
            {sortMenu.map(listItem => (
              <MenuItem key={listItem.name}>
                <button
                  onClick={() => setCurrentSort(listItem.name)}
                  className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none'
                  role='menuitem'
                  data-testid={`sort-option-${listItem.name}`}
                >
                  {listItem.description}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </header>
  );
}
