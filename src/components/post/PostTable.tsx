import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'react-cool-img';

import Button from '../Button';

import { IFullPost } from '../../typings';

import { useDeletePost } from '../../hooks/usePost';
import LoadingSkeleton from '../loading/LoadingSkeleton';

interface IPostTableProps {
  posts: IFullPost[] | null | undefined;
  isLoading?: boolean;
}

const PostTable = ({ posts, isLoading }: IPostTableProps) => {
  const navigate = useNavigate();
  const postDeleteMutation = useDeletePost();

  return (
    <>
      <table className='max-w-full overflow-x-scroll border-collapse'>
        <tbody>
          <tr>
            <th className='hidden lg:block lg:text-base'>Image</th>
            <th className='text-xs lg:text-base'>Title</th>
            <th className='text-xs lg:text-base'>Description</th>
            <th className='text-xs lg:text-base'>Time</th>
            <th className='text-xs lg:text-base'>Modify</th>
          </tr>

          {!isLoading ? (
            posts && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className='hidden lg:block'>
                    <img
                      src={post.thumbnail}
                      className='object-cover w-20 h-20 rounded-lg'
                      alt=''
                      loading='lazy'
                    />
                  </td>
                  <td>
                    <h4
                      onClick={() => navigate(`/post/${post.id}`)}
                      className='text-sm font-semibold text-green-300 cursor-pointer lg:text-base hover:underline'
                    >
                      {post.title}
                    </h4>
                  </td>
                  <td>
                    <p className='text-xs lg:text-base line-clamp-2'>{post.description}</p>
                  </td>
                  <td>
                    <p className='text-xs lg:text-base'>
                      {new Date(post.created_at).toLocaleString().split(',').reverse().join(', ')}
                    </p>
                  </td>
                  <td>
                    <Button
                      onClick={() => postDeleteMutation.mutate(post.id as string)}
                      type='button'
                      className='p-1 lg:p-2'
                    >
                      Xoá
                    </Button>
                  </td>
                </tr>
              ))
            ) : null
          ) : (
            <tr>
              <td className='hidden lg:block'>
                <LoadingSkeleton width='80px' height='80px' radius='8px' />
              </td>
              <td>
                <LoadingSkeleton height='24px' radius='8px' />
              </td>
              <td>
                <LoadingSkeleton height='24px' radius='8px' />
              </td>
              <td>
                <LoadingSkeleton height='24px' radius='8px' />
              </td>
              <td>
                <LoadingSkeleton height='40px' radius='8px' />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default memo(PostTable);
