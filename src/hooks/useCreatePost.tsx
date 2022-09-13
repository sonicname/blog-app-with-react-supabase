import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";

interface IUseCreatePost {
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  author_id: string;
}

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async ({
      author_id,
      content,
      description,
      thumbnail,
      title,
    }: IUseCreatePost) => {
      const { error } = await supabase.from<IPost>("posts").insert({
        title,
        thumbnail,
        description,
        content,
        author_id,
      });

      if (error) {
        throw error;
      }
    },
    {
      onError: () => {
        toast.error("Đăng bài viết thất bại!");
        return navigate("/");
      },
      onSuccess: () => {
        toast.success("Tạo bài viết thành công!");
        queryClient.invalidateQueries(["newest_posts"]);
        return navigate("/");
      },
    },
  );
};

export default useCreatePost;
