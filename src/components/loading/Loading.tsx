import classNames from 'classnames';
import { memo } from 'react';

interface ILoadingProps {
  width?: string;
  height?: string;
  className?: string;
}

const Loading = ({ width, height, className }: ILoadingProps) => {
  return (
    <div
      className={classNames(
        'p-2 mx-auto border-2 rounded-full border-t-transparent animate-spin',
        width ? `w-[${width}px] h-[${height}px]` : 'w-20 h-20',
        className,
      )}
    />
  );
};

export default memo(Loading);
