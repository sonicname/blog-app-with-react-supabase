import { memo, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  to: string;
  children: ReactNode;
}

const NavItem = ({ children, to }: IProps) => {
  return (
    <NavLink
      className="bg-[#8C6DFD] px-[20px] py-[9px] lg:px-[26px] lg:py-3 rounded-md text-white font-semibold hover:opacity-75"
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default memo(NavItem);
