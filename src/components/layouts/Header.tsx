import React, { useState } from "react";
import logo from "../../../assets/ghost.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/supabase-context";
import NavItem from "../navbar/NavItem";
import IconMenu from "../icons/IconMenu";
import classNames from "classnames";

const Header = () => {
  const { session, signOut } = useAuth();
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <NavLink to={"/"}>
        <img
          className="w-10 h-10 lg:w-[52px] lg:h-[52px] rounded-full bg-white"
          src={logo}
          alt=""
        />
      </NavLink>

      <IconMenu
        className="lg:hidden h-10 w-10"
        onClick={() => setToggle(!toggle)}
      />

      <div
        className={classNames(
          "fixed inset-0 bg-black bg-opacity-70 opacity-0 invisible duration-200 lg:hidden",
          toggle && "!opacity-70 !visible",
        )}
        onClick={() => setToggle(false)}
      />

      <div
        className={classNames(
          "flex gap-x-5 items-center fixed flex-col max-w-[60%] top-0 bottom-0 justify-between p-4 bg-black text-center -right-full duration-200 lg:static lg:bg-transparent lg:flex-row lg:gap-x-5 lg:max-w-full",
          toggle && "!right-0",
        )}
      >
        <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-5">
          <NavItem to={"/post"}>Bài viết</NavItem>

          {session ? (
            <NavItem to={"/create"}>Tạo bài viết mới</NavItem>
          ) : (
            <NavItem to={"/signin"}>Đăng nhập</NavItem>
          )}
        </div>

        <div className="flex items-center">
          {session && (
            <p>
              {session?.user?.email?.split("@")[0]},{" "}
              <span
                onClick={() => signOut()}
                className="font-medium text-[#4ACD8D] underline cursor-pointer"
              >
                đăng xuất
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
