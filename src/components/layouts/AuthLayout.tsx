import React, { ReactNode } from "react";
import logo from "../../../assets/ghost.png";
import { NavLink } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../errors/ErrorComponent";

interface IProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IProps) => {
  return (
    <div className="block p-6 lg-[40px] relative w-full h-screen flex items-center justify-center">
      <NavLink to={"/"}>
        <img
          className="absolute w-10 lg:w-[56px] h-10 lg:h-[56px] object-cover top-10 left-10"
          src={logo}
          alt="logo blog"
        />
      </NavLink>
      {children}
    </div>
  );
};

export default withErrorBoundary(AuthLayout, {
  FallbackComponent: ErrorComponent,
});
