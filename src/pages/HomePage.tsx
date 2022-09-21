import { NavLink } from 'react-router-dom';

import CommonLayout from '../components/layouts/CommonLayout';
import PostLayoutGrid from '../components/post/PostLayoutGrid';

import useTitle from '../hooks/useTitle';
import { useGetPosts } from '../hooks/usePost';

const HomePage = () => {
  const { data } = useGetPosts(1, 3);
  useTitle('Trang chủ');

  return (
    <CommonLayout>
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

          <PostLayoutGrid postList={data} />
        </section>
      </div>
    </CommonLayout>
  );
};

export default HomePage;
