import { DialogPanel } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { Data } from '../../../lib/pages/Modals';
import {
  ModalCategoryMenu,
  ModalText,
  ModalTitle,
  ModalInput,
  ModalField,
  ModalFieldsContainer,
  ModalContainer,
  ModalButton,
  ModalColorTagsDropdown,
  LatestTransactionCards,
  ModalBackdrop,
} from '../../../ui/';
import { Budget } from '../../../lib/types/types';
import { useState } from 'react';
import { useUpdateBudget } from '../../../lib/hooks/useBudgets';
import { useBudgetStore } from '../../../lib/store/useBudgetStore';
import toast, { Toaster } from 'react-hot-toast';

type EditBudgetModalProps = {
  isEditModalOpen: boolean;
  budget: Budget;
  handleEditClick: () => void;
};

const EditBudgetModal = ({
  isEditModalOpen,
  budget,
  handleEditClick,
}: EditBudgetModalProps) => {
  const [newBudget, setNewBudget] = useState<Budget>({
    id: budget.id,
    category: budget.category,
    spending_limit: budget.spending_limit,
    spent: budget.spent,
    theme: budget.theme,
    hex: budget.hex,
    progressBar: budget.progressBar,
    latest_spending: budget.latest_spending,
  });
  const updateBudgetMutation = useUpdateBudget(newBudget);
  const { setStoreBudgets } = useBudgetStore();

  const handleUpdateBudget = () => {
    if (newBudget.spending_limit < newBudget.spent) {
      toast.error('Spending limit cannot be less than spent amount');
      return;
    }

    updateBudgetMutation.mutate(newBudget, {
      onSuccess: () => {
        setStoreBudgets((prevBudgets: Budget[]) =>
          prevBudgets.map((budget: Budget) =>
            budget.id === newBudget.id ? newBudget : budget
          )
        );
        handleEditClick();
      },
      onError: (error: Error) => {
        console.error('Error updating budget:', error);
      },
    });
  };

  return (
    <ModalBackdrop>
      <Dialog
        open={isEditModalOpen}
        as='div'
        className='relative z-1000 focus:outline-none'
        onClose={() => {
          handleEditClick();
        }}
      >
        <ModalContainer>
          <DialogPanel
            transition
            className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
          >
            <ModalTitle title='Edit Budget' setModalOpen={handleEditClick} />
            <ModalText text={Data.EditBudget.text} />
            <ModalFieldsContainer>
              <ModalField label='Budget Category'>
                <ModalCategoryMenu
                  currentCategory={newBudget.category}
                  setCurrentCategory={category =>
                    setNewBudget({ ...newBudget, category })
                  }
                />
              </ModalField>
              <ModalField label='Maximum Spending'>
                <ModalInput
                  type='number'
                  value={newBudget.spending_limit}
                  onChange={e =>
                    setNewBudget({
                      ...newBudget,
                      spending_limit: Number(e.target.value),
                    })
                  }
                />
              </ModalField>
              <ModalField label='Spent Amount'>
                <ModalInput
                  type='number'
                  value={newBudget.spent}
                  onChange={e =>
                    setNewBudget({
                      ...newBudget,
                      spent: Number(e.target.value),
                    })
                  }
                />
              </ModalField>
              <ModalField label='Color Tag'>
                <ModalColorTagsDropdown
                  item={newBudget}
                  setCurrentColorTag={(theme, hex) =>
                    setNewBudget({ ...newBudget, theme, hex })
                  }
                />
              </ModalField>
              <ModalField label='Latest Transactions'>
                <LatestTransactionCards budget={newBudget} />
              </ModalField>
            </ModalFieldsContainer>
            <ModalButton
              onClick={() => {
                handleUpdateBudget();
              }}
              label={Data.EditBudget.button}
            />
          </DialogPanel>
        </ModalContainer>
      </Dialog>
      <Toaster position='bottom-right' reverseOrder={false} />
    </ModalBackdrop>
  );
};

export { EditBudgetModal };
