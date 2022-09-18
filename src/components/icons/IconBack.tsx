interface IProps {
  className?: string;
}

const IconBack = ({ className = 'w-6 h-6' }: IProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
      />
    </svg>
  );
};

export default IconBack;
