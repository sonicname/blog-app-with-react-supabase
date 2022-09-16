import { memo, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ErrorInput = ({ children }: IProps) => {
  return (
    <span className="text-red-500 text-[14px] font-medium">
      {children}
    </span>
  );
};

export default memo(ErrorInput);
