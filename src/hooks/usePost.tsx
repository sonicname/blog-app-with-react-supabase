import { toast } from "react-toastify";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";

interface IExtentPost extends IPost {
  user: { username: string };
}

export const useGetPosts = (): [
  IExtentPost[] | null,
  Dispatch<SetStateAction<number>>,
] => {
  const [posts, setPosts] = useState<IExtentPost[] | null>([]);
  const [limit, setLimit] = useState<number>(5);

  const getPosts = async (limit: number) => {
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      toast.error(error.message);
    } else {
      setPosts(posts);
    }
  };

  useEffect(() => {
    getPosts(limit);
  }, [limit]);

  return [posts, setLimit];
};

export const useNewestPost = (): IExtentPost[] | null => {
  const [posts, setPosts] = useState<IExtentPost[] | null>([]);

  const getPosts = async () => {
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      toast.error(error.message);
    } else {
      setPosts(posts);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return posts;
};

export const useGetPostById = (id: string) => {
  const [post, setPost] = useState<IExtentPost | null>(null);

  const getPostByID = async () => {
    const { data: post, error } = await supabase
      .from<IExtentPost>("posts")
      .select("*, user:users(username)")
      .eq("slug", id)
      .limit(1)
      .single();
    if (error) {
      toast.error(error.message);
    } else {
      setPost(post);
    }
  };

  useEffect(() => {
    getPostByID();
  }, []);

  return post;
};
