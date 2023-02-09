import { memo } from 'react';
import SkeletionLoading from '../loading/SkeletionLoading';

const PostItemSkeleton = () => {
  return (
    <div className='block h-full duration-100 shadow-2xl select-none hover:opacity-60'>
      <div className='bg-[#1C1C24] rounded-lg h-full flex flex-col'>
        <div className='h-[250px] w-full rounded-t-lg overflow-hidden'>
          <SkeletionLoading />
        </div>
        <div className='flex flex-col flex-1 px-5 py-4'>
          <div className='flex flex-col gap-y-2'>
            <SkeletionLoading className='h-4 rounded-md' />
            <SkeletionLoading className='h-3 rounded-md' />
          </div>

          <div className='mt-4'>
            <SkeletionLoading className='h-3 rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostItemSkeleton);
