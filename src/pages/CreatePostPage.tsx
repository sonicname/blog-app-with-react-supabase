import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../components/Button';
import Field from '../components/form/Field';
import Label from '../components/form/Label';
import PostEditor from '../components/post/PostEditor';
import CommonLayout from '../components/layouts/CommonLayout';

import { IPost } from '../typings';
import { schemaCreatePost } from '../config/schema';

import useCreatePost from '../hooks/useCreatePost';
import { useAuth } from '../context/supabase-context';

const CreatePostPage = () => {
  const { session } = useAuth();
  const editorRef = useRef(null);
  const postMutation = useCreatePost();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schemaCreatePost),
  });

  const handleCreatePost = (values: IPost) => {
    postMutation.mutate({
      ...values,
      // @ts-ignore
      content: editorRef.current.getContent(),
      author_id: session?.user?.id as string,
    });
  };

  return (
    <CommonLayout>
      <div className='container flex flex-col gap-y-5'>
        <h2 className='text-xl font-semibold text-center md:text-left'>Tạo bài viết mới</h2>

        <form
          // @ts-ignore
          onSubmit={handleSubmit(handleCreatePost)}
          className='flex flex-col w-full gap-y-5'
        >
          <div className='flex flex-col gap-y-5 lg:flex-row lg:gap-x-10'>
            <Field
              control={control}
              error={errors?.title?.message}
              labelText='Tiêu đề bài viết'
              name='title'
              placeholder='Nhập tiêu đề bài viết'
              type='text'
            />

            <Field
              control={control}
              error={errors?.thumbnail?.message}
              labelText='Thumbnail'
              name='thumbnail'
              placeholder='Nhập thumbnail'
              type='url'
            />

            <Field
              control={control}
              error={errors?.description?.message}
              labelText='Mô tả'
              name='description'
              placeholder='Nhập mô tả'
              type='text'
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <Label text={'Nội dung'} htmlFor={'content'} />

            <PostEditor
              editorRef={editorRef}
              initialValue={'<h1>Hello world</h1>'}
              height={500}
              menubar={true}
            />
          </div>

          <Button className='mt-2' type={'submit'}>
            Tạo bài viết
          </Button>
        </form>
      </div>
    </CommonLayout>
  );
};

export default CreatePostPage;
