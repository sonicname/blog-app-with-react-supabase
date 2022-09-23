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
      refetchOnWindowFocus: false,
    },
  );
};

export default useSearchPosts;
