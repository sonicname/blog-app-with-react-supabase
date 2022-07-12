interface IProps {
  className?: string;
  colorStroke?: string;
}

const IconMenu = ({
  className = "icon__menu",
  colorStroke = "currentColor",
}: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke={colorStroke}
      strokeWidth="2"
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
