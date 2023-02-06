import PostTable from '../components/post/PostTable';
import Container from '../components/layouts/Container';
import CommonLayout from '../components/layouts/CommonLayout';
import PostPagination from '../components/post/PostPagination';

import useChangePage from '../hooks/useChangePage';
import { useGetUserByID } from '../hooks/useProfile';
import { useAuth } from '../context/supabase-context';
import { useCountPostsByAuthor, useGetPostsByAuthor } from '../hooks/usePost';

const ProfilePage = () => {
  const { session } = useAuth();
  const { changePage, page } = useChangePage(`/profile`);

  const { data: postCount } = useCountPostsByAuthor(session?.user?.id as string);
  const { data: userInfo } = useGetUserByID(session?.user?.id as string);
  const { data: userPosts } = useGetPostsByAuthor(session?.user?.id as string, page);

  return (
    <CommonLayout>
      <Container className='min-h-full p-4 rounded-lg bg-[#3D3C42]'>
        {userInfo && (
          <div className='flex flex-col gap-y-5'>
            <h2 className='font-semibold text-center text-md lg:text-xl'>{userInfo?.username}</h2>
          </div>
        )}

        <div className='flex flex-col mt-10 gap-y-5 lg:gap-y-10'>
          {userPosts && userPosts.length > 0 ? (
            <PostTable posts={userPosts} />
          ) : (
            <h4 className='mt-10 mb-10 text-lg font-semibold text-center'>
              Hiện tại bạn chưa có bài đăng nào!
            </h4>
          )}
          {postCount && <PostPagination changePage={changePage} count={postCount} />}
        </div>
      </Container>
    </CommonLayout>
  );
};

export default ProfilePage;
