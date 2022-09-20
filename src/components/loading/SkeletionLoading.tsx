import classNames from 'classnames';

interface ISkeletonLoadingProps {
  className?: string;
}

const SkeletionLoading = ({
  className = 'w-full h-full rounded-md',
}: ISkeletonLoadingProps) => (
  <div className={classNames('skeleton', className)} />
);

export default SkeletionLoading;
