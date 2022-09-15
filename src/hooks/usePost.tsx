import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { IFullPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";

export const useGetPosts = (page: number, limit: number = 7) => {
  return useQuery(["posts", { page, limit }], async () => {
    const FROM = page > 1 ? (page - 1) * limit + 1 : (page - 1) * limit;
    const LIMIT = limit * page;
    const { data, error } = await supabase
      .from<IFullPost>("posts")
      .select(`title, description, id, slug, thumbnail, user:users(username)`)
      .order("created_at", { ascending: false })
      .range(FROM, LIMIT);

    if (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại!");
    }

    return data;
  });
};

export const useGetPostById = (id: string) => {
  return useQuery(["post", { id }], async () => {
    const { data, error } = await supabase
      .from<IFullPost>("posts")
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

export const useCountPosts = () => {
  return useQuery(["posts_count"], async () => {
    const { count, error } = await supabase.from("posts").select("id", { count: "exact" });

    if (error) {
      toast.error("Có lỗi xảy ra khi lấy số lượng bài viết!");
    }

    return count;
  });
};
