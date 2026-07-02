import RecitIcon from '../../../assets/images/icon-nav-recurring-bills.svg';    


export const Sidebar = () => {
  return (
    <article className='xl:w-1/2 flex flex-col gap-5 w-full md:flex-row xl:flex-col'>
      <section
        className='flex items-center bg-grey-900 text-white rounded-lg p-5 py-6 md:flex-1 xl:h-1/2 xl:grow-0'
        role='contentinfo'
        aria-label='Total bills'
      >
        <img src={RecitIcon} alt='Recit Icon' className='w-10 mr-5' />
        <div className='flex flex-col gap-2'>
          <h2 className='text-preset-4'>Total bills</h2>
          <span className='text-preset-1'>$384.98</span>
        </div>
      </section>
      <section
        className='flex flex-col bg-white p-5 rounded-lg gap-5 md:flex-1 xl:h-1/2 xl:grow-0'
        role='region'
        aria-label='Summary'
      >
        <h2 className='text-preset-3'>Summary</h2>
        <ul>
          <li className='flex justify-between pb-4 border-b-2 border-b-grey-100'>
            <p>Paid Bills</p>
            <p>2($320.00)</p>
          </li>
          <li className='flex justify-between py-4 border-b-2 border-b-grey-100'>
            <p>Total Upcoming</p>
            <p>6($1,220.00)</p>
          </li>
          <li className='flex justify-between pt-4 text-red'>
            <p>Due Soon</p>
            <p>2($40.00)</p>
          </li>
        </ul>
      </section>
    </article>
  );
};
