import { memo, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const Field = ({ children }: IProps) => {
  return (
    <div className='flex flex-col gap-y-[10px] w-full'>
      {children}
    </div>
  );
};

export default memo(Field);
