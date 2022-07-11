import { supabase } from "../supabase/supabase";

type UserInfo = {
  username: string;
  email: string;
  user_avatar: string;
  create_at: Date | undefined;
  number_post: number;
};

export const getUserInfo = async (id: string): Promise<UserInfo[]> => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);

  if (error) throw new Error("Lỗi khi lấy dữ liệu từ server!");
  return data;
};
