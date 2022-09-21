import classNames from 'classnames';
import { memo } from 'react';

interface ILoadingProps {
  width?: string;
  heigth?: string;
  className?: string;
}

const Loading = ({ width, heigth, className }: ILoadingProps) => {
  return (
    <div
      className={classNames(
        'p-2 mx-auto border-2 rounded-full border-t-transparent animate-spin',
        width ? `w-[${width}px] h-[${heigth}px]` : 'w-5 h-5',
        className,
      )}
    />
  );
};

export default memo(Loading);
