import { useQuery } from "@tanstack/react-query";

import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";

interface IExtentPost extends IPost {
  user: { username: string };
}

export const useGetPosts = (skip: number, limit: number) => {
  return useQuery<IPost[]>([`posts_from_${skip}_to_${limit}`], async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .range(skip, limit);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export const useNewestPost = () => {
  return useQuery<IExtentPost[]>(["newest_posts"], async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export const useGetPostById = (id: string) => {
  return useQuery([`post_${id}`], async () => {
    const { data, error } = await supabase
      .from<IExtentPost>("posts")
      .select("*, user:users(username)")
      .eq("slug", id)
      .limit(1)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};
