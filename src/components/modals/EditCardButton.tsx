import { Budget, Pot } from '../../lib/types/types';
import { Menu, MenuItems, MenuButton, MenuItem } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { EditBudgetModal } from './budget/EditBudgetModal';
import React, { useState } from 'react';
import { DeleteModal } from './DeleteModal';
import { useDeleteBudget } from '../../lib/hooks/useBudgets';
import { useDeletePot } from '../../lib/hooks/usePots';
import { EditPotModal } from './ports/EditPotModal';

type EditButtonProps = {
  item: Budget | Pot;
  type: 'budget' | 'pot';
};

const EditCardButton = React.memo(({ item, type }: EditButtonProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteBudgetMutation } = useDeleteBudget(item as Budget);
  const { mutate: deletePotMutation } = useDeletePot(item as Pot);

  const handleEditClick = () => {
    setIsEditModalOpen(prevState => !prevState);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(prevState => !prevState);
  };

  const handleDelete = () => {
    if (type === 'budget') {
      deleteBudgetMutation(item as Budget);
    } else {
      deletePotMutation();
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className='w-52 text-right'>
        <Menu as='div'>
          <MenuButton>
            <EllipsisHorizontalIcon className='size-8 text-grey-300 cursor-pointer' />
          </MenuButton>
          <MenuItems
            transition
            anchor='bottom end'
            className='w-42 text-gray-900 ring-1 ring-grey-300 origin-top-right bg-white rounded-xl border border-white/5 shadow-md py-3 px-5 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
          >
            <MenuItem>
              <button
                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-focus:bg-white/10'
                onClick={() => handleEditClick()}
              >
                Edit {type === 'budget' ? 'Budget' : 'Pot'}
              </button>
            </MenuItem>
            <div className='my-1 h-px bg-gray-100' />
            <MenuItem>
              <button
                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-focus:bg-white/10 text-red'
                onClick={() => handleDeleteClick()}
              >
                Delete {type === 'budget' ? 'Budget' : 'Pot'}
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      {isEditModalOpen && type === 'budget' && (
        <EditBudgetModal
          isEditModalOpen={isEditModalOpen}
          budget={item as Budget}
          handleEditClick={handleEditClick}
        />
      )}
      {isEditModalOpen && type === 'pot' && (
        <EditPotModal
          isEditModalOpen={isEditModalOpen}
          pot={item as Pot}
          handleEditClick={handleEditClick}
        />  
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          entityName={type === 'budget' ? 'Budget' : 'Pot'}
          handleDeleteClick={handleDeleteClick}
          onDeleteConfirm={handleDelete}
        />
      )}
    </>
  );
});

export { EditCardButton };
