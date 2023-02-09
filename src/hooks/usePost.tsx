import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { IFullPost } from '../typings';
import { supabase } from '../config/supabase';
import pagination from '../utils/pagination';

export const useGetPosts = (page: number, limit: number = 7) => {
  const { FROM, LIMIT } = pagination(page, limit);

  return useQuery(
    ['posts', { page, limit }],
    async () => {
      const { data, error } = await supabase
        .from<IFullPost>('posts')
        .select(`title, description, id, thumbnail, user:users(username)`)
        .order('created_at', { ascending: false })
        .range(FROM, LIMIT);

      if (error) throw error;

      return data;
    },
    {
      onError: () => toast.error('Lấy bài viết thất bại!'),
      refetchOnWindowFocus: false,
    },
  );
};

export const useGetPostById = (id: string) => {
  return useQuery(
    ['post', { id }],
    async () => {
      const { data, error } = await supabase
        .from<IFullPost>('posts')
        .select('*, user:users(username)')
        .eq('id', id)
        .limit(1)
        .single();

      if (error) throw error;

      return data;
    },
    {
      onError: () => toast.error('Lấy thông tin bài đăng thất bại!'),
      refetchOnWindowFocus: false,
    },
  );
};

export const useGetPostsByAuthor = (authorID: string, page: number = 1, limit: number = 7) => {
  const { FROM, LIMIT } = pagination(page, limit);

  return useQuery(
    ['posts', { authorID, page, limit }],
    async () => {
      const { data, error } = await supabase
        .from<IFullPost>('posts')
        .select('*, user:users(username)')
        .eq('author_id', authorID)
        .range(FROM, LIMIT);

      if (error) throw error;

      return data;
    },
    {
      onError: () => toast.error('Lấy thông tin bài đăng thất bại!'),
      refetchOnWindowFocus: false,
    },
  );
};

export const useCountPosts = () => {
  return useQuery(
    ['posts_count'],
    async () => {
      const { count, error } = await supabase.from('posts').select('id', { count: 'exact' });

      if (error) throw error;

      return count;
    },
    {
      onError: () => toast.error('Có lỗi xảy ra khi lấy số lượng bài viết!'),
      refetchOnWindowFocus: false,
    },
  );
};

export const useCountPostsByAuthor = (authorID: string) => {
  return useQuery(
    ['posts_count', { authorID }],
    async () => {
      const { count, error } = await supabase
        .from<IFullPost>('posts')
        .select('id', { count: 'exact' })
        .eq('author_id', authorID);

      if (error) throw error;

      return count;
    },
    {
      onError: () => toast.error('Có lỗi xảy ra khi lấy số lượng bài viết!'),
      refetchOnWindowFocus: false,
    },
  );
};
