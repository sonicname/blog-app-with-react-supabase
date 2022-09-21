import classNames from 'classnames';
import { memo } from 'react';

interface ISkeletonLoadingProps {
  className?: string;
}

const SkeletionLoading = ({
  className = 'w-full h-full rounded-md',
}: ISkeletonLoadingProps) => (
  <div className={classNames('skeleton', className)} />
);

export default memo(SkeletionLoading);
