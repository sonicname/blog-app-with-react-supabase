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
      className="border border-[#3A3A43] rounded-md w-full p-[15px] shadow outline-none text-white font-medium text-[14px] placeholder:text-[#4B5264] bg-transparent"
      placeholder={placeholder}
      {...field}
    />
  );
};

export default Input;
