import { memo } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Overlay from '../Overlay';
import IconMenu from '../IconMenu';
import NavSearch from '../nav/NavSearch';
import NavHeader from '../nav/NavHeader';

import useToggle from '../../hooks/useToggle';

import logo from '../../../assets/ghost.png';

const Header = () => {
  const { toggle, handleToggle } = useToggle();

  return (
    <header className='flex items-center justify-between gap-x-5 lg:gap-x-10'>
      <NavLink to={'/'}>
        <img
          className='w-10 h-10 lg:w-[52px] lg:h-[52px] rounded-full bg-white'
          src={logo}
          alt=''
        />
      </NavLink>
      <NavSearch />
      <IconMenu className='w-10 h-10 lg:hidden' onClick={() => handleToggle(!toggle)} />

      {toggle ? <Overlay toggle={toggle} setToggle={() => handleToggle(false)} /> : null}

      <div
        className={classNames(
          'flex gap-x-5 items-center fixed flex-col w-[60%] top-0 bottom-0 justify-between p-4 bg-black text-center -right-full duration-200 lg:static lg:bg-transparent lg:flex-row lg:gap-x-5 lg:max-w-full lg:justify-end z-30',
          toggle && '!right-0',
        )}
      >
        <NavHeader handleToggle={handleToggle} />
      </div>
    </header>
  );
};

export default memo(Header);
