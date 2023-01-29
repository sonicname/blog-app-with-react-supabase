import { memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import PostItem from './PostItem';
import PostItemSkeleton from './PostItemSkeleton';
import ErrorComponent from '../ErrorComponent';

import { IFullPost } from '../../typings';

interface IPostLayoutProps {
  postList: IFullPost[] | undefined | null;
  isLoading: boolean;
}

const PostLayoutGrid = ({ postList, isLoading }: IPostLayoutProps) => {
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-10'>
      {isLoading && new Array(4).fill(0).map((_, index) => <PostItemSkeleton key={index} />)}

      {postList &&
        postList.map((post) => (
          <PostItem
            key={post.id}
            title={post.title}
            description={post.description}
            author={post.user.username}
            id={post.id}
            thumbnail={post.thumbnail}
          />
        ))}
    </div>
  );
};

export default memo(
  withErrorBoundary(PostLayoutGrid, {
    FallbackComponent: ErrorComponent,
  }),
);
