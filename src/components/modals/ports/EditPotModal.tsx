import { DialogPanel } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { Data } from '../../../lib/pages/Modals';
import {
  ModalText,
  ModalTitle,
  ModalInput,
  ModalField,
  ModalFieldsContainer,
  ModalContainer,
  ModalButton,
  ModalColorTagsDropdown,
  ModalBackdrop,
} from '../../../ui/';
import { Pot } from '../../../lib/types/types';
import { useState } from 'react';
import { useUpdatePot } from '../../../lib/hooks/usePots';
import { usePotStore } from '../../../lib/store/usePotStore';
import { Toaster } from 'react-hot-toast';

type EditBudgetModalProps = {
  isEditModalOpen: boolean;
  pot: Pot;
  handleEditClick: () => void;
};

const EditPotModal = ({
  isEditModalOpen,
  pot,
  handleEditClick,
}: EditBudgetModalProps) => {
  const [newPot, setNewPot] = useState<Pot>({
    id: pot.id,
    name: pot.name,
    total: pot.total,
    target: pot.target,
    theme: pot.theme,
    hex: pot.hex,
    progressBar: pot.progressBar,
    userId: pot.userId,
    user: pot.user,
  });
  const updatePotMutation = useUpdatePot();
  const { setStorePots, pots } = usePotStore();

  const handleUpdatePot = () => {
    updatePotMutation.mutate(newPot, {
      onSuccess: () => {
        const updatedPots = pots.map((pot: Pot) =>
          pot.id === newPot.id ? newPot : pot
        );
        setStorePots(updatedPots);
        handleEditClick();
      },
      onError: (error: Error) => {
        console.error('Error updating pot:', error);
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
            <ModalTitle title='Edit Pot' setModalOpen={handleEditClick} />
            <ModalText text={Data.EditPot.text} />
            <ModalFieldsContainer>
              <ModalField label='Pot Name'>
                <ModalInput
                  type='text'
                  value={newPot.name}
                  onChange={e => setNewPot({ ...newPot, name: e.target.value })}
                />
              </ModalField>
              <ModalField label='Maximum Spending'>
                <ModalInput
                  type='number'
                  value={newPot.target}
                  onChange={e =>
                    setNewPot({
                      ...newPot,
                      target: Number(e.target.value),
                    })
                  }
                />
              </ModalField>

              <ModalField label='Color Tag'>
                <ModalColorTagsDropdown
                  item={newPot}
                  setCurrentColorTag={(theme, hex) =>
                    setNewPot({ ...newPot, theme, hex })
                  }
                />
              </ModalField>
            </ModalFieldsContainer>
            <ModalButton
              onClick={() => {
                handleUpdatePot();
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

export { EditPotModal };
