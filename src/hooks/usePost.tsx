import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";
import { useQuery } from "@tanstack/react-query";

interface IExtentPost extends IPost {
  user: { username: string };
}

export const useGetPosts = (limit: number) => {
  const getPosts = async (limit: number) => {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery<IPost[]>(["posts"], () => getPosts(limit));
};

export const useNewestPost = () => {
  const getNewestPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .limit(10);

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
