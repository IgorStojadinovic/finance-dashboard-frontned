import clsx from 'clsx';

type SearchBarProps = {
  disabledSearch: boolean;
  searchInput: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const SearchBar = ({
  disabledSearch,
  searchInput,
  handleSearch,
  placeholder,
}: SearchBarProps) => {
  return (
    <>
      <label htmlFor='transaction-search' className='sr-only'>
        Search transactions
      </label>
      <input
        type='text'
        id='transaction-search'
        disabled={disabledSearch}
        placeholder={placeholder}
        aria-label='Search transactions'
        value={searchInput}
        data-testid='transaction-search-input'
        className={clsx(
          'rounded-md ring-1 w-4/6 border-0 p-0 px-3 text-grey-500 py-2 shadow-sm ring-gray-300 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring-gray-300',
          disabledSearch && 'placeholder-grey-300'
        )}
        onChange={handleSearch}
      />
    </>
  );
};

export { SearchBar };
