import { memo } from 'react';
import classNames from 'classnames';

interface ILoadingSkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  radius?: string;
}

const LoadingSkeleton = ({ className, height, radius, width = '100%' }: ILoadingSkeletonProps) => (
  <div
    className={classNames('skeleton', className)}
    style={{ height, width, borderRadius: radius }}
  ></div>
);

export default memo(LoadingSkeleton);
