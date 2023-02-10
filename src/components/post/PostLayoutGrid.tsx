import { memo } from 'react';

import PostItem from './PostItem';
import PostItemSkeleton from './PostItemSkeleton';

import { IFullPost } from '../../typings';

interface IPostLayoutProps {
  postList: IFullPost[] | undefined | null;
  isLoading: boolean;
}

const PostLayoutGrid = ({ postList, isLoading }: IPostLayoutProps) => {
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-10'>
      {isLoading ? new Array(8).fill(0).map((_, index) => <PostItemSkeleton key={index} />) : null}

      {postList
        ? postList.map((post) => (
            <PostItem
              key={post.id}
              title={post.title}
              description={post.description}
              author={post.user.username}
              id={post.id}
              thumbnail={post.thumbnail}
            />
          ))
        : null}
    </div>
  );
};

export default memo(PostLayoutGrid);
