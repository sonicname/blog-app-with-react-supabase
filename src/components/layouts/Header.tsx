import React from "react";
import logo from "../../../assets/ghost.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { supabase } from "../../supabase/supabase";

const Header = () => {
  const session = useAuth();
  return (
    <div className="flex items-center justify-between">
      <NavLink to={"/"}>
        <img className="w-10 h-10 lg:w-[52px] lg:h-[52px]" src={logo} alt="" />
      </NavLink>

      <div className="flex gap-x-10 items-center">
        <NavLink
          className="bg-[#8C6DFD] px-[20px] py-[9px] lg:px-[26px] lg:py-3 rounded-md text-white font-semibold"
          to={"/post"}
        >
          Tạo bài viết mới
        </NavLink>

        <div className="flex items-center">
          <p>
            {session?.user?.email?.split("@")[0]},{" "}
            <span
              onClick={() => supabase.auth.signOut()}
              className="font-medium text-[#4ACD8D] underline cursor-pointer"
            >
              đăng xuất
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
