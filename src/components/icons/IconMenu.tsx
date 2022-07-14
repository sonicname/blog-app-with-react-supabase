import React from "react";
import classNames from "classnames";

interface IProps {
  className?: string;
  onClick?: (value?: boolean) => void;
}

const IconMenu = ({ className, onClick }: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("h-6 w-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      // @ts-ignore
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default IconMenu;
