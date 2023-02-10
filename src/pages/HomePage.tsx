import { NavLink } from 'react-router-dom';

import PostLayoutGrid from '../components/post/PostLayoutGrid';

import { useGetPosts } from '../hooks/usePost';

const HomePage = () => {
  const { data: newestPost, isLoading } = useGetPosts(1, 7);

  return (
    <div className='flex flex-col mt-4 gap-y-5 lg:gap-y-10'>
      <section className='flex flex-col gap-y-5'>
        <h2 className='font-semibold text-[16px] lg:text-[24px] flex items-baseline gap-x-4'>
          Bài đăng mới nhất{' '}
          <NavLink
            to={'/posts'}
            className='font-semibold text-green-500 text-[14px] lg:text-[16px] hover:underline'
          >
            xem thêm
          </NavLink>
        </h2>

        {newestPost && newestPost.length === 0 && (
          <h4 className='mt-10 text-lg font-semibold text-center'>Danh sách bài viết trống</h4>
        )}

        {newestPost && newestPost.length > 0 && (
          <PostLayoutGrid postList={newestPost} isLoading={isLoading} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
