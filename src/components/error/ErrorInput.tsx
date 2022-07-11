import React from "react";

interface IProps {
  message: string;
}

const ErrorInput = ({ message }: IProps) => {
  return <p className="error__input">{message}</p>;
};

export default ErrorInput;
