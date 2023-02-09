import classNames from 'classnames';
import { memo, ReactNode } from 'react';

import Header from './Header';
import Footer from './Footer';

interface IProps {
  children: ReactNode;
  className?: string;
}

const CommonLayout = ({ children, className }: IProps) => {
  return (
    <div
      className={classNames(
        'px-4 py-[20px] lg:p-8 flex flex-col gap-y-5 lg:gap-y-[20px] text-white min-h-screen h-full',
        className,
      )}
    >
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default memo(CommonLayout);
