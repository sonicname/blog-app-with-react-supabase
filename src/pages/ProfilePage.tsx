import { useNavigate } from 'react-router-dom';

import Button from '../components/button/Button';
import Container from '../components/layouts/Container';
import CommonLayout from '../components/layouts/CommonLayout';
import PostPagination from '../components/post/PostPagination';

import { useAuth } from '../context/supabase-context';

import useChangePage from '../hooks/useChangePage';
import useDeletePost from '../hooks/useDeletePost';
import { useGetUserByID } from '../hooks/useProfile';
import { useCountPostsByAuthor, useGetPostsByAuthor } from '../hooks/usePost';

// TODO

const ProfilePage = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const postDeleteMutation = useDeletePost();
  const { changePage, page } = useChangePage(`/profile`);

  const { data: postCount } = useCountPostsByAuthor(
    session?.user?.id as string,
  );
  const { data: userInfo } = useGetUserByID(session?.user?.id as string);
  const { data: userPosts } = useGetPostsByAuthor(
    session?.user?.id as string,
    page,
  );
  return (
    <CommonLayout>
      <Container className='min-h-full p-4 rounded-lg bg-[#3D3C42]'>
        {userInfo && (
          <div className='flex flex-col gap-y-5'>
            <img
              className='object-cover w-16 h-16 mx-auto rounded-full'
              src={userInfo?.avatar}
              alt=''
            />

            <h2 className='font-semibold text-center text-md lg:text-xl'>
              {userInfo?.username}
            </h2>
          </div>
        )}

        <div className='flex flex-col mt-5 gap-y-5 lg:gap-y-10'>
          {userPosts && (
            <table className='max-w-full overflow-x-scroll border-collapse'>
              <tbody>
                <tr>
                  <th className='hidden lg:block lg:text-sm'>Image</th>
                  <th className='text-xs lg:text-base'>Title</th>
                  <th className='text-xs lg:text-base'>Description</th>
                  <th className='text-xs lg:text-base'>Time</th>
                  <th className='text-xs lg:text-base'>Modify</th>
                </tr>
                {userPosts.map((post) => (
                  <tr key={post.id}>
                    <td className='hidden lg:block'>
                      <img
                        src={post.thumbnail}
                        className='object-cover w-20 h-20 rounded-lg'
                        alt=''
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
                      <p className='text-base lg:text-base line-clamp-2'>
                        {post.description}
                      </p>
                    </td>
                    <td>
                      <p className='text-base lg:text-base'>
                        {new Date(post.created_at).toLocaleString()}
                      </p>
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          postDeleteMutation.mutate(post.id as string)
                        }
                        type='button'
                        className='p-1 lg:p-2'
                      >
                        Xoá
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {postCount && (
            <PostPagination changePage={changePage} count={postCount} />
          )}
        </div>
      </Container>
    </CommonLayout>
  );
};

export default ProfilePage;
