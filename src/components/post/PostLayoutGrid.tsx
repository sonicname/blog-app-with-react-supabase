import PostItem from './PostItem';
import { IFullPost } from '../../types/IPost';
import PostItemSkeleton from './PostItemSkeleton';

interface IPostLayoutProps {
  postList: IFullPost[] | undefined | null;
}

const PostLayoutGrid = ({ postList }: IPostLayoutProps) => {
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-10'>
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
        : new Array(4)
            .fill(0)
            .map((_, index) => <PostItemSkeleton key={index} />)}
    </div>
  );
};

export default PostLayoutGrid;
