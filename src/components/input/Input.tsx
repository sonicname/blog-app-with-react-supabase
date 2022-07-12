import { Control, useController } from "react-hook-form";

interface IProps {
  name: string;
  type: string;
  placeholder: string;
  control: Control;
  className: string;
  defaultValue?: string;
}

const Input = ({
  name,
  type = "text",
  placeholder,
  className = "auth__input",
  defaultValue,
  control,
}: IProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: defaultValue,
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
