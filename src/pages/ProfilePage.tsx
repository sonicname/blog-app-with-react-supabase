import { Navigate } from 'react-router-dom';

import PostTable from '../components/post/PostTable';
import Container from '../components/layouts/Container';
import PostPagination from '../components/post/PostPagination';

import useChangePage from '../hooks/useChangePage';
import { useAuth } from '../context/supabase-context';
import { useCountPostsByAuthor, useGetPostsByAuthor, useGetUserByID } from '../hooks/usePost';

const ProfilePage = () => {
  const { session } = useAuth();
  if (!session) return <Navigate to={'/auth/signin'} />;

  const { changePage, page } = useChangePage(`/profile`);

  const { data: postCount } = useCountPostsByAuthor(session.user?.id as string);
  const { data: userInfo, isLoading } = useGetUserByID(session.user?.id as string);
  const { data: userPosts } = useGetPostsByAuthor(session.user?.id as string, page);

  return (
    <Container className='min-h-full p-4 rounded-lg bg-[#3D3C42]'>
      {userInfo ? (
        <div className='flex flex-col gap-y-5'>
          <h2 className='font-semibold text-center text-md lg:text-xl'>{userInfo?.username}</h2>
        </div>
      ) : null}

      <div className='flex flex-col mt-10 gap-y-5 lg:gap-y-10'>
        <PostTable posts={userPosts} isLoading={isLoading} />
        {postCount ? <PostPagination changePage={changePage} count={postCount} /> : null}
      </div>
    </Container>
  );
};

export default ProfilePage;
