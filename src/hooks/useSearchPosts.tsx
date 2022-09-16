import { useQuery } from "@tanstack/react-query";

import { supabase } from "../supabase/supabase";
import { IPostSearchItem } from "../types/IPost";

const useSearchPosts = (keyword: string) => {
  return useQuery(
    ["posts", { keyword }],
    async () => {
      const { data } = await supabase
        .from<IPostSearchItem>("posts")
        .select("title, id")
        .ilike("title", `%${keyword}%`)
        .range(1, 5);

      return data || [];
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};

export default useSearchPosts;
