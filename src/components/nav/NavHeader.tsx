import { memo } from 'react';

import NavItem from './NavItem';

import { useAuth } from '../../context/supabase-context';
import useSupabaseAuth from '../../hooks/useSupabaseAuth';

interface INavHeaderProps {
  handleToggle: (toggle: boolean) => void;
}

const NavHeader = ({ handleToggle }: INavHeaderProps) => {
  const { session } = useAuth();
  const { signOut } = useSupabaseAuth();

  return (
    <>
      <div className='flex flex-col gap-y-10 lg:flex-row lg:gap-x-5'>
        <NavItem to={'/posts'} handleToggleNavItem={() => handleToggle(false)}>
          Bài viết
        </NavItem>
        {session ? (
          <NavItem to={'/create'} handleToggleNavItem={() => handleToggle(false)}>
            Tạo bài viết mới
          </NavItem>
        ) : (
          <NavItem to={'/auth/signin'} handleToggleNavItem={() => handleToggle(false)}>
            Đăng nhập
          </NavItem>
        )}
      </div>

      {session ? (
        <div className='flex flex-col lg:gap-x-5 lg:flex-row gap-y-10'>
          <NavItem to={`/profile`} handleToggleNavItem={() => handleToggle(false)}>
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
    </>
  );
};

export default memo(NavHeader);
