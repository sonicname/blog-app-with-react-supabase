import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../config/supabase';
import { IPost } from '../typings';

interface IUseCreatePost {
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  author_id: string;
}

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async ({ author_id, content, description, thumbnail, title }: IUseCreatePost) => {
      await supabase.from<IPost>('posts').insert({
        title,
        thumbnail,
        description,
        content,
        author_id,
      });
    },
    {
      onError: () => {
        toast.error('Đăng bài viết thất bại!');
        return navigate('/');
      },
      onSuccess: () => {
        toast.success('Tạo bài viết thành công!');
        queryClient.invalidateQueries(['posts', 'posts_count']);
        return navigate('/');
      },
    },
  );
};

export default useCreatePost;
