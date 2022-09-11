import { memo, ReactNode } from "react";
import classNames from "classnames";
import { withErrorBoundary } from "react-error-boundary";

import ErrorComponent from "../errors/ErrorComponent";

interface IProps {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  type,
  children,
  disabled,
  className = "",
  onClick,
}: IProps) => {
  return (
    <button
      className={classNames(
        "text-white font-semibold text-[16px] w-full py-[13px] bg-[#1DC071] rounded-lg shadow-md hover:opacity-75 active:scale-90 duration-300",
        className,
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(
  withErrorBoundary(Button, {
    FallbackComponent: ErrorComponent,
  }),
);
