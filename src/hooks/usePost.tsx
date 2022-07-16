import { useEffect, useState } from "react";
import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";
import { toast } from "react-toastify";

export const useNewestPost = (): IPost[] | null => {
  const [posts, setPosts] = useState<IPost[] | null>([]);
  useEffect(() => {
    const getPosts = async () => {
      const { data: posts, error } = await supabase
        .from("posts")
        .select(`*, user:users(username)`)
        .limit(6);
      console.log(posts);

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
