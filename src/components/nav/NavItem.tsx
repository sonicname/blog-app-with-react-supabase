import { memo, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  to: string;
  children: ReactNode;
}

const NavItem = ({ children, to }: IProps) => {
  return (
    <NavLink
      className='bg-[#8C6DFD] px-[20px] py-[10px] lg:px-[18px] rounded-md text-white font-semibold hover:opacity-75 duration-100'
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default memo(NavItem);
