import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import IconMenu from "../Icons/IconMenu";
import { useOnClickOutside } from "../../hooks/useClickOutSide";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => {
    setOpen(false);
  });

  const handleOpenMenu = () => setOpen(!open);
  return (
    <header className="header">
      <NavLink to={"/"}>
        <h1 className="header__title">Weeboo Blog</h1>
      </NavLink>

      <div className="header__menu" onClick={handleOpenMenu}>
        <IconMenu />
      </div>

      <div className={`header__links ${open ? "active" : ""}`} ref={menuRef}>
        <div className="header__links-heading">
          <h3>Weeboo Menu</h3>
        </div>

        <div className="header__links-body">
          <div className="header__link">
            <NavLink to={"/blog"}>Bài Đăng</NavLink>
          </div>

          <div className="header__link">
            <NavLink to={"/popular"}>Nổi Bật</NavLink>
          </div>

          <div className="header__link">
            <NavLink to={"/storage"}>Lưu trữ</NavLink>
          </div>

          <div className="header__link">
            <NavLink to={"/search"}>Tìm Kiếm</NavLink>
          </div>
        </div>

        <div className="header__link header__account">
          <NavLink to={"/signin"}>Đăng Nhập</NavLink> /{" "}
          <NavLink to={"/signup"}>Đăng Ký</NavLink>
        </div>
      </div>

      <div className={`header__overlay ${open ? "active" : ""}`}></div>
    </header>
  );
};

export default Header;
