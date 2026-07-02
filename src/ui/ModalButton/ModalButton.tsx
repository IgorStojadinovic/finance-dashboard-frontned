import { Button } from "@headlessui/react";

type ModalButtonProps = {
  onClick: () => void;
  label: string;
};

const ModalButton = ({ onClick, label }: ModalButtonProps) => {
  return (
    <div className='mt-4'>
      <Button
        className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none data-hover:bg-gray-600 data-focus:outline-1 data-focus:outline-white data-open:bg-gray-700'
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  );
};

export { ModalButton };
