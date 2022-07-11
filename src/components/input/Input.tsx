import React from "react";
import { Control, useController } from "react-hook-form";

interface IProps {
  name: string;
  type: string;
  placeholder: string;
  control: Control;
  className: string;
}

const Input = ({ control, type, placeholder, name, className }: IProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      {...field}
    />
  );
};

export default Input;
