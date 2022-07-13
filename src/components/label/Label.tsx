import React from "react";

interface IProps {
  text: string;
  htmlFor: string;
}

const Label = ({ text, htmlFor }: IProps) => {
  return (
    <label htmlFor={htmlFor} className="text-[#808191] font-medium text-[14px]">
      {text}
    </label>
  );
};

export default Label;
