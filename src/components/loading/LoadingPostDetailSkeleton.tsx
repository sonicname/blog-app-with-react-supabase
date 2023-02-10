import { memo } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const LoadingPostDetailSkeleton = () => {
  return (
    <>
      <LoadingSkeleton height='100px' radius='8px' />
      <LoadingSkeleton height='36px' radius='8px' />
      <div className='text-sm font-medium'>
        <LoadingSkeleton height='20px' radius='8px' />
      </div>
      <LoadingSkeleton height='500px' radius='8px' />
    </>
  );
};

export default memo(LoadingPostDetailSkeleton);
