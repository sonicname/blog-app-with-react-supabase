import { IPost } from "../types/IPost";
import { Session } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import { toast } from "react-toastify";

export const createPost = async (
  values: IPost,
  session: Session | null,
  navigate: NavigateFunction,
) => {
  const { error } = await supabase.from<IPost>("posts").insert({
    title: values.title,
    thumbnail: values.thumbnail,
    description: values.description,
    // @ts-ignore
    content: editorRef.current.getContent(),
    author_id: session?.user?.id,
  });

  if (error) {
    toast.error(error.message);
  } else {
    toast.success("Tạo bài viết thành công!");
    navigate("/");
  }
};
