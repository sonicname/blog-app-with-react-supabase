import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { memo, useCallback, useState } from 'react';

import Overlay from '../Overlay';
import IconMenu from '../IconMenu';
import NavItem from '../nav/NavItem';
import NavSearch from '../nav/NavSearch';

import { useAuth } from '../../context/supabase-context';

import logo from '../../../assets/ghost.png';

const Header = () => {
  const { session, signOut } = useAuth();
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback(() => setToggle(false), [toggle]);

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
      <IconMenu className='w-10 h-10 lg:hidden' onClick={() => setToggle(!toggle)} />

      {toggle ? <Overlay toggle={toggle} setToggle={setToggle} /> : null}

      <div
        className={classNames(
          'flex gap-x-5 items-center fixed flex-col w-[60%] top-0 bottom-0 justify-between p-4 bg-black text-center -right-full duration-200 lg:static lg:bg-transparent lg:flex-row lg:gap-x-5 lg:max-w-full lg:justify-end z-30',
          toggle && '!right-0',
        )}
      >
        <div className='flex flex-col gap-y-10 lg:flex-row lg:gap-x-5'>
          <NavItem to={'/posts'} handleToggleNavItem={handleToggle}>
            Bài viết
          </NavItem>
          {session ? (
            <NavItem to={'/create'} handleToggleNavItem={handleToggle}>
              Tạo bài viết mới
            </NavItem>
          ) : (
            <NavItem to={'/auth/signin'} handleToggleNavItem={handleToggle}>
              Đăng nhập
            </NavItem>
          )}
        </div>

        {session ? (
          <div className='flex flex-col lg:gap-x-5 lg:flex-row gap-y-10'>
            <NavItem to={`/profile`} handleToggleNavItem={handleToggle}>
              Tài khoản
            </NavItem>
            <span
              className='bg-[#8C6DFD] px-[20px] py-[10px] lg:px-[18px] rounded-md text-white font-semibold hover:opacity-75 duration-100 cursor-pointer'
              onClick={() => signOut()}
            >
              Đăng xuất
            </span>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default memo(Header);
