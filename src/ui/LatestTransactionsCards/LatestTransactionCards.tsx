import { Budget } from '../../lib/types/types';

type LatestTransactionCardsProps = {
  budget: Budget | undefined;
};

const LatestTransactionCards = ({ budget }: LatestTransactionCardsProps) => {
  return (
    <div className='max-h-[200px] overflow-y-auto'>
      {budget?.latest_spending.map((transaction, index) => (
        <div
          key={index}
          className='flex items-center justify-between p-3 border-b-2 border-white last:border-b-0'
        >
          <div className='flex items-center gap-3'>
            <img
              src={transaction.image}
              alt={transaction.name}
              className='w-8 h-8 rounded-full'
            />
            <div>
              <p className='text-sm font-medium capitalize'>
                {transaction.name}
              </p>
              <p className='text-xs text-grey-500'>{transaction.date}</p>
            </div>
          </div>
          <p className='text-sm font-medium text-red'>{transaction.amount}</p>
        </div>
      ))}
    </div>
  );
};

export { LatestTransactionCards };
