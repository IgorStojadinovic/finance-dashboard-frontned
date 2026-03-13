import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { colorTags } from './data';
import { Budget, NewBudget, Pot, CreatePot } from '../../lib/types/types';

type ModalColorTagsDropdownProps = {
  item: Budget | NewBudget | Pot | CreatePot;
  setCurrentColorTag: (theme: string, hex: string) => void;
};

const ModalColorTagsDropdown = ({
  item,
  setCurrentColorTag,
}: ModalColorTagsDropdownProps) => {
  return (
    <Menu as='div' className='relative w-full'>
      <div className='flex flex-col w-full gap-1 text-preset-5-bold text-grey-500'>
        <MenuButton className='inline-flex py-3 px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50  '>
          <div className='flex gap-2'>
            <div
              className='w-4 h-4 rounded-full'
              style={{ background: item.hex }}
            ></div>
            <p className=''>{item.theme}</p>
          </div>
          <ChevronDownIcon
            aria-hidden='true'
            className='-mr-1 size-5 text-gray-400'
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className='absolute w-full max-h-[200px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75 data-enter:ease-out data-leave:ease-in scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-grey-white scrollbar-track-gray-50  '
      >
        <div className='py-1'>
          {colorTags.map(color => {
            return (
              <MenuItem key={color.theme}>
                <li
                  onClick={() => {
                    setCurrentColorTag(color.theme, color.hex);
                  }}
                  className='flex items-center gap-2 capitalize px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none'
                >
                  <div
                    className='w-4 h-4 rounded-full'
                    style={{ background: color.hex }}
                  ></div>
                  {color.theme}
                </li>
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </Menu>
  );
};

export { ModalColorTagsDropdown };
