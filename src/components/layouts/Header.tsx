import { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import NavItem from '../navbar/NavItem';
import IconMenu from '../icons/IconMenu';
import Overlay from '../overlays/Overlay';
import NavSearch from '../navbar/NavSearch';
import ErrorComponent from '../errors/ErrorComponent';

import { useAuth } from '../../context/supabase-context';

import logo from '../../../assets/ghost.png';

const Header = () => {
  const { session, signOut } = useAuth();
  const [toggle, setToggle] = useState(false);

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
      <IconMenu
        className='w-10 h-10 lg:hidden'
        onClick={() => setToggle(!toggle)}
      />
      <Overlay toggle={toggle} setToggle={setToggle} />
      <div
        className={classNames(
          'flex gap-x-5 items-center fixed flex-col w-[60%] top-0 bottom-0 justify-between p-4 bg-black text-center -right-full duration-200 lg:static lg:bg-transparent lg:flex-row lg:gap-x-5 lg:max-w-full lg:justify-end z-30',
          toggle && '!right-0',
        )}
      >
        <div className='flex flex-col gap-y-10 lg:flex-row lg:gap-x-5'>
          <NavItem to={'/posts'}>Bài viết</NavItem>
          {session ? (
            <NavItem to={'/create'}>Tạo bài viết mới</NavItem>
          ) : (
            <NavItem to={'/signin'}>Đăng nhập</NavItem>
          )}
        </div>

        {session && (
          <div className='flex flex-col lg:gap-x-5 lg:flex-row gap-y-10'>
            <NavItem to={`/profile`}>Tài khoản</NavItem>
            <span
              className='bg-[#8C6DFD] px-[20px] py-[10px] lg:px-[18px] rounded-md text-white font-semibold hover:opacity-75 duration-100 cursor-pointer'
              onClick={() => signOut()}
            >
              Đăng xuất
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default withErrorBoundary(Header, {
  FallbackComponent: ErrorComponent,
});
