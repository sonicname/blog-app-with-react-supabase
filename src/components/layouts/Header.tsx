import { memo, useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";

import { useAuth } from "../../context/supabase-context";

import NavItem from "../navbar/NavItem";
import IconMenu from "../icons/IconMenu";
import Overlay from "../overlays/Overlay";
import ErrorComponent from "../errors/ErrorComponent";

import logo from "../../../assets/ghost.png";

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
        className="w-10 h-10 lg:hidden"
        onClick={() => setToggle(!toggle)}
      />

      <Overlay toggle={toggle} setToggle={setToggle} />

      <div
        className={classNames(
          "flex gap-x-5 items-center fixed flex-col w-[60%] top-0 bottom-0 justify-between p-4 bg-black text-center -right-full duration-200 lg:static lg:bg-transparent lg:flex-row lg:gap-x-5 lg:max-w-full lg:justify-end z-[10]",
          toggle && "!right-0",
        )}
      >
        <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-5">
          <NavItem to={"/search"}>Tìm Kiếm</NavItem>
          <NavItem to={"/posts"}>Bài viết</NavItem>

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

export default memo(
  withErrorBoundary(Header, {
    FallbackComponent: ErrorComponent,
  }),
);
