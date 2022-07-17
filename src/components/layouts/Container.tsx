import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Container = ({ children }: IProps) => {
  return (
    <div className="max-w-[1024px] mx-auto pl-[20px] pr-[20px]">{children}</div>
  );
};

export default Container;
