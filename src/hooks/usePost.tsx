import { useEffect, useState } from "react";
import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";
import { toast } from "react-toastify";

interface IExtentPost extends IPost {
  user: { username: string };
}

export const useNewestPost = (): IPost[] | null => {
  const [posts, setPosts] = useState<IPost[] | null>([]);
  useEffect(() => {
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

    getPosts();
  }, []);

  return posts;
};

export const useGetPostById = (id: string) => {
  const [post, setPost] = useState<IExtentPost | null>(null);

  useEffect(() => {
    const getPostByID = async () => {
      try {
        const { data: post, error } = await supabase
          .from<IExtentPost>("posts")
          .select("*, user:users(username)")
          .eq("slug", id)
          .limit(1)
          .single();
        if (post) {
          setPost(post);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getPostByID();
  }, []);

  return post;
};
