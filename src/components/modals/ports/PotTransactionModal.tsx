import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Field, Input, Label, Button } from '@headlessui/react';
import { Pot } from '../../../lib/types/types';
import { CardStatusBar } from '../../../ui';
import { useUpdatePot } from '../../../lib/hooks/usePots';
import toast from 'react-hot-toast';

interface PotTransactionModalProps {
  modalOpen: boolean;
  currentPot: Pot | null;
  closeModal: () => void;
  barWidth: string;
  modalType: 'add' | 'withdraw';
}

/**
 * Renders Add money or Withdraw money modal
 */
export default function PotTransactionModal({
  modalOpen,
  currentPot,
  closeModal,
  modalType,
}: PotTransactionModalProps): React.ReactElement | null {
  const defaultPot: Pot = {
    id: '',
    userId: '',
    name: '',
    target: 0,
    total: 0,
    theme: '',
    hex: '',
    progressBar: '0%',
  };
  const [updatedPot, setUpdatedPot] = useState<Pot>(
    currentPot ? { ...currentPot } : defaultPot
  );
  const [amount, setAmount] = useState<number>(0);
  console.log(currentPot);

  const updatePotMutation = useUpdatePot();

  if (!currentPot) return null;

  const handleUpdatePot = () => {
    if (currentPot && amount > currentPot.target) {
      toast.error('Amount cannot be greater than target');
      return;
    }

    const newTotal =
      modalType === 'add'
        ? updatedPot.total + amount
        : updatedPot.total - amount;

    const newProgressBar = `${Math.min(
      100,
      Math.round((newTotal / updatedPot.target) * 100)
    )}%`;

    const updatedPotData = {
      ...updatedPot,
      total: newTotal,
      progressBar: newProgressBar,
    };

    updatePotMutation.mutate(updatedPotData, {
      onSuccess: () => {
        setUpdatedPot(updatedPotData);
        closeModal();
        toast.success(
          modalType === 'add'
            ? 'Money added successfully!'
            : 'Money withdrawn successfully!'
        );
      },
      onError: (error: Error) => {
        console.error('Error updating pot:', error);
        toast.error('Failed to update pot');
      },
    });
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      {modalOpen && <div className='fixed inset-0 bg-black/30 z-0'></div>}
      <Dialog
        open={modalOpen}
        as='div'
        className='relative z-50 focus:outline-none'
        onClose={handleClose}
      >
        <section className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <aside className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8'>
              <DialogTitle
                as='h3'
                id='add-money-title'
                className='text-preset-2 flex justify-between items-center'
              >
                {`${modalType === 'add' ? 'Add to' : 'Withdraw from'} "${
                  currentPot.name
                }"`}
                <XCircleIcon
                  className='size-8 cursor-pointer text-grey-500'
                  onClick={handleClose}
                />
              </DialogTitle>

              <p className='text-preset-4 text-grey-500 mb-5'>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
                neque, aliquet.
              </p>

              <section className='flex flex-col'>
                <header className='flex items-center justify-between mb-4'>
                  <h2 className='text-preset-4 text-grey-500'>
                    Current Amount
                  </h2>
                  <p className='text-preset-1'>{`$ ${updatedPot.total}`}</p>
                </header>
                <CardStatusBar item={currentPot} />

                <figcaption className='flex justify-between items-center mt-2 text-preset-5 text-grey-500'>
                  <p className='text-red-500'>{updatedPot.progressBar}</p>
                  <p>Total of {updatedPot.target}</p>
                </figcaption>
              </section>

              <Field className='flex flex-col gap-1 w-full'>
                <Label className='text-preset-5-bold text-grey-500'>
                  Amount to {modalType === 'add' ? 'add' : 'withdraw'}
                </Label>
                <fieldset className='group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50'>
                  <Input
                    value={amount}
                    type='number'
                    placeholder='$ 0'
                    className='w-full py-[0.08rem] px-2 border-0 text-preset-5 items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    onChange={e => setAmount(Number(e.target.value))}
                  />
                </fieldset>
              </Field>

              <Button
                className='mt-4 z-50 flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none hover:bg-white hover:text-grey-900 hover:border hover:border-grey-900'
                onClick={() => {
                  handleUpdatePot();
                }}
              >
                {modalType === 'add'
                  ? 'Confirm Addition'
                  : 'Confirm Withdrawal'}
              </Button>
            </DialogPanel>
          </aside>
        </section>
      </Dialog>
    </>
  );
}
