import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { TransactionDropdownProps } from './transactions.types';
import IconSort from '../../../assets/images/icon-sort.svg';

export default function TransactionDropdown({
  currentSort,
  setSort,
  dropdownarray,
}: TransactionDropdownProps) {
  return (
    <Menu as='section' className='relative inline-block text-left'>
      <span className='flex items-center gap-3 text-preset-5 text-grey-500'>
        <p className='hidden md:block'>Sort by</p>
        <MenuButton
          aria-haspopup='true'
          aria-expanded='false'
          aria-label={`Sort by ${currentSort}`}
          data-testid='sort-menu-button'
          className='inline-flex md:min-w-[100px] h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white md:px-3 md:py-2 text-sm font-semibold text-gray-900 md:shadow-sm md:ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          <p className='hidden md:flex' data-testid='sort-value'>
            {currentSort}
          </p>
          <ChevronDownIcon
            aria-hidden='true'
            className='-mr-1 size-5 text-gray-400 hidden md:flex'
          />
          <img src={IconSort} className='h-6 w-6 md:hidden' alt='Sort icon' />
        </MenuButton>
      </span>
      <MenuItems
        transition
        as='ul'
        aria-label='Sort options'
        data-testid='sort-menu-items'
        className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75 data-enter:ease-out data-leave:ease-in'
      >
        {dropdownarray.map(listItem => (
          <MenuItem key={listItem.name} as='li'>
            <button
              onClick={() => setSort(listItem.name)}
              data-testid={`sort-option-${listItem.name}`}
              className='w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none'
            >
              {listItem.description}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
