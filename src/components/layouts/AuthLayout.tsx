import { memo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import logo from '../../../assets/ghost.png';

const AuthLayout = () => {
  return (
    <div className='p-6 lg-[40px] relative w-full h-screen flex items-center justify-center'>
      <NavLink to={'/'}>
        <img
          className='absolute w-10 lg:w-[56px] h-10 lg:h-[56px] object-cover top-10 left-10'
          src={logo}
          alt='logo blog'
        />
      </NavLink>
      <Outlet />
    </div>
  );
};

export default memo(AuthLayout);
