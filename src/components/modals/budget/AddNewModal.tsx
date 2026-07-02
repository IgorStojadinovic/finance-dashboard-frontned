import { Button, DialogTitle, DialogPanel, Dialog } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import {
  ModalField,
  ModalInput,
  ModalCategoryMenu,
  ModalBackdrop,
  ModalColorTagsDropdown,
} from '../../../ui';
import { useBudgetStore } from '../../../lib/store/useBudgetStore';
import { useState, useEffect } from 'react';
import { useCreateBudget } from '../../../lib/hooks/useBudgets';
import { CreatePot, NewBudget } from '../../../lib/types/types';
import { useUserId } from '../../../lib/hooks/useGetUser';
import toast, { Toaster } from 'react-hot-toast';
import { useCreatePot } from '../../../lib/hooks/usePots';

type AddNewModalProps = {
  type: 'budget' | 'pot';
};

const DEFAULT_COLOR = {
  theme: 'green',
  hex: '#277C78',
};

const BudgetForm = ({
  newBudget,
  setNewBudget,
  currentCategory,
  setCurrentCategory,
}: {
  newBudget: NewBudget;
  setNewBudget: (budget: NewBudget) => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}) => (
  <>
    <ModalField label='Budget Category'>
      <ModalCategoryMenu
        currentCategory={currentCategory}
        setCurrentCategory={category => {
          setCurrentCategory(category);
          setNewBudget({ ...newBudget, category });
        }}
      />
    </ModalField>
    <ModalField label='Spending Limit'>
      <ModalInput
        placeholder='$ e.g 2000'
        onChange={e => {
          setNewBudget({
            ...newBudget,
            spending_limit: Number(e.target.value),
          });
        }}
      />
    </ModalField>
    <ModalField label='Spent'>
      <ModalInput
        placeholder='$ e.g 2000'
        onChange={e => {
          setNewBudget({
            ...newBudget,
            spent: Number(e.target.value),
          });
        }}
      />
    </ModalField>
  </>
);

const PotForm = ({
  newPot,
  setNewPot,
  currentPotName,
  setCurrentPotName,
}: {
  newPot: CreatePot;
  setNewPot: (pot: CreatePot) => void;
  currentPotName: string;
  setCurrentPotName: (name: string) => void;
}) => (
  <>
    <ModalField label='Pot Name'>
      <ModalInput
        value={currentPotName}
        type='text'
        placeholder='Enter pot name'
        onChange={e => {
          setNewPot({
            ...newPot,
            name: e.target.value,
          });
          setCurrentPotName(e.target.value);
        }}
      />
    </ModalField>
    <ModalField label='Target Amount'>
      <ModalInput
        placeholder='$ e.g 2000'
        onChange={e => {
          setNewPot({
            ...newPot,
            target: Number(e.target.value),
          });
        }}
      />
    </ModalField>
  </>
);

const AddNewModal = ({ type }: AddNewModalProps) => {
  const { addBudgetModalOpen, setAddBudgetModalOpen } = useBudgetStore();
  const userId = useUserId();
  const [currentCategory, setCurrentCategory] = useState('All Transactions');
  const [currentPotName, setCurrentPotName] = useState('');

  const [newBudget, setNewBudget] = useState<NewBudget>({
    userId,
    category: currentCategory,
    spending_limit: 0,
    spent: 0,
    theme: DEFAULT_COLOR.theme,
    hex: DEFAULT_COLOR.hex,
  });

  const [newPot, setNewPot] = useState<CreatePot>({
    userId,
    name: '',
    target: 0,
    total: 0,
    progressBar: '0%',
    theme: DEFAULT_COLOR.theme,
    hex: DEFAULT_COLOR.hex,
  });

  const { mutate: createBudget } = useCreateBudget();
  const { mutate: createPot } = useCreatePot();
  const resetNewPot = () => {
    setNewPot({
      userId,
      name: '',
      target: 0,
      total: 0,
      progressBar: '0%',
      theme: DEFAULT_COLOR.theme,
      hex: DEFAULT_COLOR.hex,
    });
    setCurrentPotName('');
  };
  const handleSetNewPot = (updates: Partial<CreatePot>) => {
    setNewPot(prevPot => {
      const updatedPot = {
        ...prevPot,
        ...updates,
      };
      console.log('Updated pot state:', updatedPot);
      return updatedPot;
    });
  };
  useEffect(() => {
    if (addBudgetModalOpen && type === 'pot') {
      resetNewPot();
    }
    // eslint-disable-next-line
  }, [addBudgetModalOpen, type]);

  const handleCreateItem = () => {
    if (type === 'budget') {
      const { spending_limit, spent, category } = newBudget;
      if (spending_limit < spent) {
        toast.error('Spending limit cannot be less than spent amount');
        return;
      }
      if (category === 'All Transactions') {
        toast.error('Choose a category');
        return;
      }
      createBudget(newBudget);
      setAddBudgetModalOpen(false);
      setCurrentCategory('All Transactions');
    } else {
      if (!newPot.name.trim()) {
        toast.error('Enter pot name');
        return;
      }
      if (!newPot.hex) {
        toast.error('Color is required');
        return;
      }

      createPot(newPot, {
        onSuccess: () => {
          toast.success('Pot created successfully');
          setAddBudgetModalOpen(false);
          resetNewPot();
        },
        onError: () => toast.error('Failed to create pot'),
      });
    }
  };

  const RenderModal = (
    <ModalBackdrop>
      <Dialog
        open={addBudgetModalOpen}
        as='div'
        className='relative z-50 focus:outline-none'
        onClose={() => {
          setAddBudgetModalOpen(false);
          resetNewPot();
        }}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='flex w-full max-w-md flex-col gap-5 rounded-xl bg-white p-6 shadow-md md:max-w-xl md:p-8'>
              <DialogTitle
                as='h3'
                className='text-preset-2 flex items-center justify-between'
              >
                Add New {type === 'budget' ? 'Budget' : 'Pot'}
                <XCircleIcon
                  className='text-grey-500 size-8 cursor-pointer'
                  onClick={() => {
                    setAddBudgetModalOpen(false);
                    resetNewPot();
                  }}
                />
              </DialogTitle>
              <p className='text-preset-4 text-grey-500'>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </p>
              <div className='flex flex-col gap-4'>
                {type === 'budget' ? (
                  <BudgetForm
                    newBudget={newBudget}
                    setNewBudget={setNewBudget}
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                  />
                ) : (
                  <PotForm
                    newPot={newPot}
                    setNewPot={setNewPot}
                    currentPotName={currentPotName}
                    setCurrentPotName={setCurrentPotName}
                  />
                )}
                <ModalField label='Color Tag'>
                  <ModalColorTagsDropdown
                    item={type === 'budget' ? newBudget : newPot}
                    setCurrentColorTag={(theme, hex) => {
                      console.log('Setting color tag:', { theme, hex });
                      if (type === 'budget') {
                        setNewBudget({ ...newBudget, theme, hex });
                      } else {
                        handleSetNewPot({ theme, hex });
                      }
                    }}
                  />
                </ModalField>
              </div>
              <div className='mt-4'>
                <Button
                  className='bg-grey-900 text-preset-4-bold flex h-14 w-full items-center justify-center gap-2 rounded-md px-4 py-1.5 text-white focus:outline-none'
                  onClick={handleCreateItem}
                >
                  Add {type === 'budget' ? 'Budget' : 'Pot'}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Toaster position='bottom-right' reverseOrder={false} />
    </ModalBackdrop>
  );

  return (
    <>
      <Button
        onClick={() => setAddBudgetModalOpen(true)}
        className='text-preset-4-bold bg-grey-900 rounded-md p-4 font-medium text-white hover:cursor-pointer'
      >
        Add New {type === 'budget' ? 'Budget' : 'Pot'}
      </Button>
      {addBudgetModalOpen && RenderModal}
    </>
  );
};

export { AddNewModal };
