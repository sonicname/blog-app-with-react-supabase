import React, { ReactNode } from "react";

interface IProps {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = ({ type, children, disabled, className = "" }: IProps) => {
  return (
    <button
      className={`text-white font-semibold text-[16px] w-full py-[13px] bg-[#1DC071] rounded-lg shadow-md ${className}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;