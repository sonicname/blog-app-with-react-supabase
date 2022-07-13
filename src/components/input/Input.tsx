import React from "react";
import { Control, useController } from "react-hook-form";

interface IProps {
  type: string;
  control: Control;
  name: string;
  placeholder?: string;
}

const Input = ({ type, control, name, placeholder }: IProps) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: "",
  });

  return (
    <input
      id={name}
      type={type}
      className="border border-[#F1F1F3] rounded-md w-full p-[15px] shadow outline-none text-[#171725] font-medium text-[14px] placeholder:text-[#B2B3BD]"
      placeholder={placeholder}
      {...field}
    />
  );
};

export default Input;
