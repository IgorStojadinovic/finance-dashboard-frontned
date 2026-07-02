import { MenuButton, MenuItem, MenuItems, Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { categoriesMenu as categories } from '../../lib/lits';

type CategoryMenuProps = {
  currentCategory?: string;
  setCurrentCategory?: (category: string) => void;
};

const ModalCategoryMenu = ({
  currentCategory,
  setCurrentCategory,
}: CategoryMenuProps) => (
  <Menu as='div' className='relative w-full'>
    <div className='flex flex-col w-full gap-1 text-preset-5-bold text-grey-500'>
      <MenuButton className='inline-flex py-3 px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50 '>
        <p>{currentCategory}</p>
        <ChevronDownIcon
          aria-hidden='true'
          className='-mr-1 size-5 text-gray-400'
        />
      </MenuButton>
    </div>
    <MenuItems className='absolute w-full max-h-[300px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-grey-white scrollbar-track-gray-50  '>
      <div className='py-1'>
        {categories.map(listItem => (
          <MenuItem key={listItem.name}>
            <li
              onClick={() => {
                console.log('Selected category:', listItem.name);
                setCurrentCategory?.(listItem.name);
              }}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              {listItem.description}
            </li>
          </MenuItem>
        ))}
      </div>
    </MenuItems>
  </Menu>
);

export { ModalCategoryMenu };
