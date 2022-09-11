import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";
import { useQuery } from "@tanstack/react-query";

interface IExtentPost extends IPost {
  user: { username: string };
}

export const useGetPosts = (skip: number, limit: number) => {
  const getPosts = async (skip: number, limit: number) => {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .range(skip, limit);

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery<IPost[]>([`posts_from_${skip}_to_${limit}`], () =>
    getPosts(skip, limit),
  );
};

export const useNewestPost = () => {
  const getNewestPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery<IExtentPost[]>(["newest_posts"], () => getNewestPosts());
};

export const useGetPostById = (id: string) => {
  const getPostByID = async (id: string) => {
    const { data, error } = await supabase
      .from<IExtentPost>("posts")
      .select("*, user:users(username)")
      .eq("slug", id)
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery([`post_${id}`], () => getPostByID(id));
};
