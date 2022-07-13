import React, { ReactNode } from "react";
import Header from "./Header";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="px-6 py-[26px] lg:p-10 flex flex-col gap-y-5 lg:gap-y-[30px] text-white">
      <Header />
      {children}
    </div>
  );
};

export default CommonLayout;
