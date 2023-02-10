import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IFullPost, IPost, IPostSearchItem, IUser } from '../typings';

import { supabase } from '../config/supabase';
import pagination from '../utils/pagination';

interface IUseCreatePost {
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  author_id: string;
}

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
      staleTime: 2 * 60 * 1_000,
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
      staleTime: 2 * 60 * 1_000,
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
      staleTime: 2 * 60 * 1_000,
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
      staleTime: 2 * 60 * 1_000,
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
      staleTime: 2 * 60 * 1_000,
    },
  );
};

export const useSearchPosts = (keyword: string) => {
  return useQuery(
    ['posts', { keyword }],
    async () => {
      const { data } = await supabase
        .from<IPostSearchItem>('posts')
        .select('title, id')
        .ilike('title', `%${keyword.toLowerCase()}%`)
        .range(0, 5);

      return data || [];
    },
    {
      onError: () => toast.error('Tìm kiếm thất bại!'),
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1_000,
    },
  );
};

export const useCreatePost = () => {
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

export const useDeletePost = () => {
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

export const useGetUserByID = (userID: string) => {
  return useQuery(
    ['user', { userID }],
    async () => {
      const { data, error } = await supabase
        .from<IUser>('users')
        .select('*')
        .eq('id', userID)
        .single();

      if (error) throw error;

      return data;
    },
    {
      onError: () => toast.error('Lấy thông tin người dùng thất bại!'),
    },
  );
};
