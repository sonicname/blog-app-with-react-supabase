import { useQuery } from "@tanstack/react-query";

import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";
import { toast } from "react-toastify";

interface IExtentPost extends IPost {
  user: { username: string };
}

export const useGetPosts = (page: number, limit: number = 7) => {
  return useQuery([`posts_page_${page}`], async () => {
    const { data, error } = await supabase
      .from<IPost>("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, limit * page);

    if (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại!");
    }

    return data;
  });
};

export const useNewestPost = () => {
  return useQuery(["newest_posts"], async () => {
    const { data, error } = await supabase
      .from<IExtentPost>("posts")
      .select(`*, user:users(username)`)
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại!");
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
      toast.error("Có lỗi xảy ra vui lòng thử lại!");
    }

    return data;
  });
};
