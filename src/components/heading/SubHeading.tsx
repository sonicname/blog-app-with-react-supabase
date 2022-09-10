import { NavLink } from "react-router-dom";

interface IProps {
  content: string;
  hrefText: string;
  to: string;
}

const SubHeading = ({ content, to, hrefText }: IProps) => {
  return (
    <p className="text-[#808191] text-[14px]">
      {content}{" "}
      <span className="text-[#1DC071] font-medium underline">
        <NavLink to={to}>{hrefText}</NavLink>
      </span>
    </p>
  );
};

export default SubHeading;
