import { Link, useLocation } from 'react-router-dom';
import LogoLarge from '../../assets/images/logo-large.svg';
import LogoSmall from '../../assets/images/logo-small.svg';
import { clsx } from 'clsx';
import { BsFillCircleFill } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import overviewActiveIcon from '../../assets/images/icon-nav-overview.svg';
import transactionsActiveIcon from '../../assets/images/icon-nav-transactions.svg';
import budgetsActiveIcon from '../../assets/images/icon-nav-budgets.svg';
import potsActiveIcon from '../../assets/images/icon-nav-pots.svg';
import recurringActiveIcon from '../../assets/images/icon-nav-recurring-bills.svg';
import minimizeIcon from '../../assets/images/icon-minimize-menu.svg';
import { useState } from 'react';

const navItems = [
  {
    path: '/dashboard/overview',
    name: 'Overview',
    activeIcon: overviewActiveIcon,
  },
  {
    path: '/dashboard/transactions',
    name: 'Transactions',
    activeIcon: transactionsActiveIcon,
  },
  {
    path: '/dashboard/budgets',
    name: 'Budgets',
    activeIcon: budgetsActiveIcon,
  },
  {
    path: '/dashboard/pots',
    name: 'Pots',
    activeIcon: potsActiveIcon,
  },
  {
    path: '/dashboard/recurring',
    name: 'Recurring',
    activeIcon: recurringActiveIcon,
  },
];

type NavItem = {
  path: string;
  name: string;
  activeIcon: string;
};

const Navbar = () => {
  const { pathname } = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);

  const MobileNavItem = ({ item }: { item: NavItem }) => (
    <li className='relative w-1/3 h-10 flex flex-col items-center justify-center hover:bg-white rounded-t-lg group transition-all ease-in-out duration-100'>
      <Link to={item.path}>
        <img
          src={item.activeIcon}
          alt={item.name}
          className='w-5 h-5 group-hover:brightness-0 group-hover:invert-[.35] group-hover:sepia group-hover:saturate-3000 group-hover:hue-rotate-100'
        />
      </Link>
      <div className='h-1 w-full bg-grey-900 absolute bottom-0 group-hover:bg-green' />
    </li>
  );

  const DesktopNavItem = ({ item }: { item: NavItem }) => (
    <li
      className={clsx(
        'relative rounded-r-lg h-10 flex items-center',
        'hover:bg-white border-l-4 border-l-grey-900 hover:border-l-green',
        'group transition-all ease-in-out duration-200',
        isMinimized ? 'w-full justify-center' : 'w-[85%]',
        { 'bg-white border-l-green': pathname === item.path }
      )}
    >
      <Link
        to={item.path}
        className={clsx(
          'flex items-center gap-4 h-full w-full transition-all duration-300',
          isMinimized ? 'justify-center px-0' : 'px-8'
        )}
      >
        <img
          src={item.activeIcon}
          alt={item.name}
          className={clsx('w-6 h-6', {
            'filter-[brightness(0)_saturate(100%)_invert(39%)_sepia(19%)_saturate(1642%)_hue-rotate(140deg)_brightness(94%)_contrast(88%)]':
              pathname === item.path,
            'group-hover:filter-[brightness(0)_saturate(100%)_invert(39%)_sepia(19%)_saturate(1642%)_hue-rotate(140deg)_brightness(94%)_contrast(88%)]':
              pathname !== item.path,
          })}
        />
        {!isMinimized && (
          <span
            className={clsx(
              'text-preset-3',
              pathname === item.path
                ? 'text-grey-900'
                : 'text-grey-300 group-hover:text-grey-900'
            )}
          >
            {item.name}
          </span>
        )}
      </Link>
    </li>
  );

  const MobileNav = () => (
    <nav className='bg-grey-900 px-10 pt-2 rounded-t-lg'>
      <ul className='flex justify-between'>
        {navItems.map(item => (
          <MobileNavItem key={item.path} item={item} />
        ))}
      </ul>
    </nav>
  );

  const DesktopNav = () => (
    <div className='relative'>
      <nav
        className={clsx(
          'bg-grey-900 flex flex-col rounded-r-3xl h-full',
          'transition-all duration-300 ease-in-out',
          isMinimized ? 'w-[120px] pr-4' : 'w-[300px]'
        )}
      >
        <div
          className={clsx(
            'min-h-[88px] flex items-center justify-center overflow-hidden',
            isMinimized ? 'py-8 px-6' : 'py-8 px-10'
          )}
        >
          <img src={isMinimized ? LogoSmall : LogoLarge} className='h-6' />
        </div>

        <div className='flex flex-col justify-between flex-1 gap-6'>
          <ul className='flex flex-col gap-1 mb-auto'>
            {navItems.map(item => (
              <DesktopNavItem key={item.path} item={item} />
            ))}
          </ul>

          <div className='mt-auto mb-20 flex flex-col gap-6'>
            <button
              onClick={() => setIsMinimized(prev => !prev)}
              className={clsx(
                'flex items-center cursor-pointer h-10 rounded-r-lg gap-4 py-2',
                'hover:bg-white border-l-4 border-l-grey-900 hover:border-l-green',
                'group transition-all duration-300 ease-in-out',
                isMinimized ? 'w-full px-6 justify-center' : 'w-[85%] px-10'
              )}
            >
              <img
                src={minimizeIcon}
                alt='Minimize'
                className={clsx(
                  'w-5 h-5 transition-transform duration-300',
                  isMinimized && 'rotate-180'
                )}
              />
              {!isMinimized && (
                <span className='text-preset-3 text-grey-300 group-hover:text-grey-900'>
                  Minimize
                </span>
              )}
            </button>

            <div>
              <Link
                to='/'
                className={clsx(
                  'group flex items-center w-full rounded-r-lg gap-4 py-2 px-10',
                  'hover:bg-white border-l-4 border-l-grey-900 hover:border-l-green',
                  'text-preset-3 text-grey-300 hover:text-grey-900',
                  isMinimized &&
                    'py-0 px-0 h-10 flex items-center justify-center'
                )}
              >
                <BsFillCircleFill
                  size={20}
                  className='group-hover:text-green'
                />
                {!isMinimized && <span>Logout</span>}
              </Link>

              <a
                href='https://github.com/IgorStojadinovic/finance-dashboard'
                target='_blank'
                className={clsx(
                  'group flex items-center  w-full rounded-r-lg gap-4 py-2 px-10',
                  'hover:bg-white border-l-4 border-l-grey-900 hover:border-l-green',
                  'text-preset-3 text-grey-300 hover:text-grey-900',
                  isMinimized &&
                    'py-0 px-0 flex h-10  w-full items-center justify-center'
                )}
              >
                <FaGithub size={20} className='group-hover:text-green' />
                {!isMinimized && <span>Frontend</span>}
              </a>
              <a
                href='https://github.com/IgorStojadinovic/finance-dashboard-backend'
                target='_blank'
                className={clsx(
                  'group flex items-center  w-full rounded-r-lg gap-4 py-2 px-10',
                  'hover:bg-white border-l-4 border-l-grey-900 hover:border-l-green',
                  'text-preset-3 text-grey-300 hover:text-grey-900',
                  isMinimized &&
                    'py-0 px-0 flex h-10  w-full items-center justify-center'
                )}
              >
                <FaGithub size={20} className='group-hover:text-green' />
                {!isMinimized && <span>Backend</span>}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <div className='xl:hidden'>
        <MobileNav />
      </div>
      <div className='xl:flex hidden'>
        <DesktopNav />
      </div>
    </>
  );
};

export { Navbar };
