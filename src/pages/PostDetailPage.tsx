import parser from 'html-react-parser';
import { useParams } from 'react-router-dom';

import CommonLayout from '../components/layouts/CommonLayout';
import Container from '../components/layouts/Container';

import { useGetPostById } from '../hooks/usePost';

const PostDetailPage = () => {
  const { postID } = useParams<string>();
  const { data: postInfo, isLoading } = useGetPostById(
    postID as string,
  );

  return (
    <CommonLayout>
      <Container className='flex flex-col gap-y-5'>
        {!isLoading ? (
          <>
            <img
              src={postInfo?.thumbnail}
              className='w-full h-[250px] object-cover rounded-md'
              alt=''
            />
            <h1 className='text-3xl font-semibold text-center'>
              {postInfo?.title}
            </h1>
            <div className='text-sm font-medium'>
              {new Date(
                postInfo?.created_at as Date,
              ).toLocaleDateString()}{' '}
              - by -{' '}
              <span className='font-bold !text-md text-purple-500'>
                {postInfo?.user.username}
              </span>
            </div>
            <div className='content-box'>
              {parser(`${postInfo?.content as string}`)}
            </div>
          </>
        ) : (
          <div className='w-20 h-20 p-5 mx-auto border-4 rounded-full border-t-transparent animate-spin' />
        )}
      </Container>
    </CommonLayout>
  );
};

export default PostDetailPage;
