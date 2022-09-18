import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { IFullPost } from '../types/IPost';
import { supabase } from '../supabase/supabase';

export const useGetPosts = (page: number, limit: number = 7) => {
  const FROM = page > 1 ? (page - 1) * limit + 1 : (page - 1) * limit;
  const LIMIT = page === 1 ? page * limit : limit * page + 1;
  return useQuery(['posts', { page, limit }], async () => {
    const { data, error } = await supabase
      .from<IFullPost>('posts')
      .select(`title, description, id, thumbnail, user:users(username)`)
      .order('created_at', { ascending: false })
      .range(FROM, LIMIT);

    if (error) {
      toast.error('Có lỗi xảy ra vui lòng thử lại!');
    }

    return data;
  });
};

export const useGetPostById = (id: string) => {
  return useQuery(['post', { id }], async () => {
    const { data, error } = await supabase
      .from<IFullPost>('posts')
      .select('*, user:users(username)')
      .eq('id', id)
      .limit(1)
      .single();

    if (error) {
      toast.error('Có lỗi xảy ra vui lòng thử lại!');
    }

    return data;
  });
};

export const useGetPostsByAuthor = (
  authorID: string,
  page: number = 1,
  limit: number = 7,
) => {
  const FROM = page > 1 ? (page - 1) * limit + 1 : (page - 1) * limit;
  const LIMIT = page === 1 ? page * limit : limit * page + 1;

  return useQuery(['posts', { authorID, page, limit }], async () => {
    const { data, error } = await supabase
      .from<IFullPost>('posts')
      .select('*, user:users(username)')
      .eq('author_id', authorID)
      .range(FROM, LIMIT);

    if (error) {
      toast.error('Có lỗi xảy ra vui lòng thử lại!');
    }

    return data;
  });
};

export const useCountPosts = () => {
  return useQuery(['posts_count'], async () => {
    const { count, error } = await supabase
      .from('posts')
      .select('id', { count: 'exact' });

    if (error) {
      toast.error('Có lỗi xảy ra khi lấy số lượng bài viết!');
    }

    return count;
  });
};

export const useCountPostsByAuthor = (authorID: string) => {
  return useQuery(['posts_count', { authorID }], async () => {
    const { count, error } = await supabase
      .from<IFullPost>('posts')
      .select('id', { count: 'exact' })
      .eq('author_id', authorID);

    if (error) {
      toast.error('Có lỗi xảy ra khi lấy số lượng bài viết!');
    }

    return count;
  });
};
