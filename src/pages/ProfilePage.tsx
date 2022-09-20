import Container from '../components/layouts/Container';
import CommonLayout from '../components/layouts/CommonLayout';
import PostPagination from '../components/post/PostPagination';
import PostTable from '../components/post/PostTable';

import { useAuth } from '../context/supabase-context';

import useChangePage from '../hooks/useChangePage';
import { useGetUserByID } from '../hooks/useProfile';
import {
  useCountPostsByAuthor,
  useGetPostsByAuthor,
} from '../hooks/usePost';

const ProfilePage = () => {
  const { session } = useAuth();
  const { changePage, page } = useChangePage(`/profile`);

  const { data: postCount } = useCountPostsByAuthor(
    session?.user?.id as string,
  );
  const { data: userInfo } = useGetUserByID(
    session?.user?.id as string,
  );
  const { data: userPosts } = useGetPostsByAuthor(
    session?.user?.id as string,
    page,
  );
  return (
    <CommonLayout>
      <Container className='min-h-full p-4 rounded-lg bg-[#3D3C42]'>
        {userInfo && (
          <div className='flex flex-col gap-y-5'>
            <h2 className='font-semibold text-center text-md lg:text-xl'>
              {userInfo?.username}
            </h2>
          </div>
        )}

        <div className='flex flex-col mt-10 gap-y-5 lg:gap-y-10'>
          <PostTable posts={userPosts} />
          {postCount && (
            <PostPagination
              changePage={changePage}
              count={postCount}
            />
          )}
        </div>
      </Container>
    </CommonLayout>
  );
};

export default ProfilePage;
