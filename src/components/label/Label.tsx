import React, { ReactNode } from "react";

interface IProps {
  htmlFor: string;
  children: ReactNode;
  className: string;
}

const Label = ({ htmlFor, children, className }: IProps) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
