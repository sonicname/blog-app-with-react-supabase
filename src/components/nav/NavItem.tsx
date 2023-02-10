import { memo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  to: string;
  children: ReactNode;
  handleToggleNavItem?: () => void;
}

const NavItem = ({ children, to, handleToggleNavItem }: IProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='bg-[#8C6DFD] px-5 py-3 lg:px-6 rounded-md text-white font-semibold hover:opacity-75 duration-100 select-none cursor-pointer'
      onClick={() => {
        if (handleToggleNavItem) {
          handleToggleNavItem();
        }

        navigate(to);
      }}
    >
      {children}
    </div>
  );
};

export default memo(NavItem);
