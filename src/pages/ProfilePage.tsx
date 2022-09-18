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

  const { data: postCount } = useCountPostsByAuthor(
    session?.user?.id as string,
  );
  const { changePage, page, limit } = useChangePage(`/profile`);

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
            <table className='w-full border-collapse'>
              <tbody>
                <tr>
                  <th className='hidden lg:block'>Thumbnail</th>
                  <th>Tiêu đề</th>
                  <th>Mô tả</th>
                  <th>Thời gian</th>
                  <th>Xoá</th>
                </tr>
                {userPosts.map((post) => (
                  <tr key={post.id}>
                    <td className='hidden lg:block' colSpan={1}>
                      <img
                        src={post.thumbnail}
                        className='object-cover w-20 h-20 mx-auto rounded-lg'
                        alt=''
                      />
                    </td>
                    <td>
                      <h4
                        onClick={() => navigate(`/post/${post.id}`)}
                        className='text-lg font-semibold underline cursor-pointer'
                      >
                        {post.title}
                      </h4>
                    </td>
                    <td>
                      <p className='text-md line-clamp-2'>{post.description}</p>
                    </td>
                    <td>
                      <p className='text-center text-md'>
                        {new Date(post.created_at).toLocaleString()}
                      </p>
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          postDeleteMutation.mutate(post.id as string)
                        }
                        type='button'
                        className='px-2 py-1 lg:p-2'
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
            <PostPagination
              changePage={changePage}
              count={postCount}
              perPage={limit}
            />
          )}
        </div>
      </Container>
    </CommonLayout>
  );
};

export default ProfilePage;
