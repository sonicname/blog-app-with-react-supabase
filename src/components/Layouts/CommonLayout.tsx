import React, { ReactNode, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import IconMenu from "../Icons/IconMenu";
import { useOnClickOutside } from "../../hooks/useClickOutSide";

interface IProps {
  children?: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => {
    setOpen(false);
  });

  const handleOpenMenu = () => setOpen(!open);

  return (
    <div className="container">
      <header className="header">
        <NavLink to={"/"}>
          <h1 className="header__title">Weeboo Blog</h1>
        </NavLink>

        <div className="header__menu" onClick={handleOpenMenu}>
          <IconMenu />
        </div>

        <div className={`header__links ${open ? "active" : ""}`} ref={menuRef}>
          <div className="header__link">
            <NavLink to={"/blog"}>Blog</NavLink>
          </div>

          <div className="header__link">
            <NavLink to={"/signin"}>Sign In</NavLink>
          </div>

          <div className="header__link">
            <NavLink to={"/signup"}>Sign Up</NavLink>
          </div>
        </div>

        <div className={`header__overlay ${open ? "active" : ""}`}></div>
      </header>
      {children}
      <footer className="footer"></footer>
    </div>
  );
};

export default CommonLayout;
