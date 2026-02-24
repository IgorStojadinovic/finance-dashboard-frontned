import { Dialog, DialogTitle, DialogPanel, Button } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { ModalBackdrop } from '../../ui';

type DeleteModalProps = {
  isDeleteModalOpen: boolean;
  entityName: string;
  handleDeleteClick: () => void;
  onDeleteConfirm: () => void;
};

const DeleteModal = ({
  isDeleteModalOpen,
  entityName,
  handleDeleteClick,
  onDeleteConfirm,
}: DeleteModalProps) => {
  return (
    <ModalBackdrop>
      <Dialog
        open={isDeleteModalOpen}
        as='div'
        className='relative z-1000 focus:outline-none'
        onClose={() => {
          handleDeleteClick();
        }}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6  md:p-8 duration-200 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
            >
              <DialogTitle
                as='h3'
                className='text-preset-2 flex justify-between items-center capitalize'
              >
                {`Delete ${entityName}?`}
                <XCircleIcon
                  className='size-8 cursor-pointer text-grey-500'
                  onClick={() => {
                    handleDeleteClick();
                  }}
                />
              </DialogTitle>
              <p className='text-preset-4 text-grey-500'>
                Are you sure you want to delete this {entityName}? This action
                cannot be reversed, and all the data inside it will be removed
                forever.
              </p>
              <div className='mt-4 flex flex-col gap-2'>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-red py-1.5 px-4 text-preset-4-bold text-white focus:outline-none data-hover:bg-gray-600 data-focus:outline-1 data-focus:outline-white data-open:bg-gray-700'
                  onClick={() => {
                    onDeleteConfirm();
                  }}
                >
                  Yes, Confirm Deletion
                </Button>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-white py-1.5 px-4 text-preset-4 text-grey-500 focus:outline-none  data-focus:outline-1 data-focus:outline-white '
                  onClick={() => {
                    handleDeleteClick();
                  }}
                >
                  No, I want to go back
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </ModalBackdrop>
  );
};

export { DeleteModal };
