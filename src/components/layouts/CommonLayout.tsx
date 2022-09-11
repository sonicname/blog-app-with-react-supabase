import { memo, ReactNode } from "react";
import Header from "./Header";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../errors/ErrorComponent";
import classNames from "classnames";

interface IProps {
  children: ReactNode;
  className?: string;
}

const CommonLayout = ({ children, className }: IProps) => {
  return (
    <div
      className={classNames(
        "px-6 py-[26px] lg:p-10 flex flex-col gap-y-5 lg:gap-y-[30px] text-white",
        className,
      )}
    >
      <Header />
      {children}
    </div>
  );
};

export default memo(
  withErrorBoundary(CommonLayout, {
    FallbackComponent: ErrorComponent,
  }),
);
