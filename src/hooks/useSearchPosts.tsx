import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { IPostSearchItem } from '../typings';
import { supabase } from '../config/supabase';

const useSearchPosts = (keyword: string) => {
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

export default useSearchPosts;
