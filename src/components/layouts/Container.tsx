import classNames from "classnames";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: IProps) => {
  return (
    <div
      className={classNames(
        "max-w-[1024px] mx-auto pl-[20px] pr-[20px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
