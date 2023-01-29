import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../config/supabase';

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (postID: string) => {
      const { error, data } = await supabase.from('posts').delete().match({ id: postID });

      if (error) {
        throw error;
      }

      return data;
    },
    {
      onError: () => toast.error('Xoá bài viết thất bại!'),
      onSuccess: () => {
        toast.success('Xoá bài viết thành công!');
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['posts_count']);
      },
    },
  );
};

export default useDeletePost;
