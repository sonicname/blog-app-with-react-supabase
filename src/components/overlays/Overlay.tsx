import React from "react";
import classNames from "classnames";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../errors/ErrorComponent";

interface IProps {
  toggle: boolean;
  setToggle: (value: boolean) => void;
}

const Overlay = ({ toggle, setToggle }: IProps) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 bg-black bg-opacity-70 opacity-0 invisible duration-200 lg:hidden",
        toggle && "!opacity-70 !visible",
      )}
      onClick={() => setToggle(false)}
    />
  );
};

export default withErrorBoundary(Overlay, {
  FallbackComponent: ErrorComponent,
});
