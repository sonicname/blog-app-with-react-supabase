import React, { ReactNode } from "react";

interface IProps {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  disabled?: boolean;
}

const Button = ({ type, children, disabled }: IProps) => {
  return (
    <button
      className={`text-white font-semibold text-[16px] w-full py-[13px] bg-[#1DC071] rounded-lg shadow-md`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
