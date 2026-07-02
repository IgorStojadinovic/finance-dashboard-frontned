import { useBudgetStore } from '../../lib/store/useBudgetStore';

const ChartList = () => {
  const { storeBudgets } = useBudgetStore();
  return (
    <div className='w-full'>
      <h3 className='text-preset-2 self-start mb-6'>Spending Summary</h3>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-1 w-full last:border-b-none'>
        {storeBudgets.map((item, index) => {
          return (
            <div
              key={index}
              className='flex justify-between gap-4 pb-4 border-b border-grey-100 last:border-b-0'
            >
              <div className='flex gap-4'>
                <div
                  className='h-full w-1 bg-green rounded-lg'
                  style={{ background: item.hex }}
                ></div>
                <h3 className='text-preset-4 text-grey-500 capitalize'>
                  {item.category}
                </h3>
              </div>
              <div className='flex gap-2'>
                <span className='text-preset-3'>{item.spent}</span>
                <p className='text-preset-5 text-grey-500'>
                  of {item.spending_limit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ChartList };
