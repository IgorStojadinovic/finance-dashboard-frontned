import { Input } from '@headlessui/react';

type ModalInputProps = {
  value?: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

const ModalInput = ({
  value,
  onChange,
  placeholder,
  type = 'number',
}: ModalInputProps) => {
  return (
    <div className='group inline-flex py-3 px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 '>
      {type === 'number' && <p className='text-preset-4 text-grey-400'>$</p>}
      <Input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className='w-full py-[0.08rem] px-2 border-0 text-preset-5  items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        value={value}
      />
    </div>
  );
};

export { ModalInput };
