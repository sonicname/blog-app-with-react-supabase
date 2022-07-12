import React, { useEffect, useState } from "react";
import { getUserInfo } from "../utils/getUserInfo";
import { supabase } from "../supabase/supabase";

type UserInfo = {
  username: string;
  email: string;
  user_avatar: string;
  createTime: Date | undefined;
  numberPost: number;
};

const UseProfile = (): [
  UserInfo,
  (value: ((prevState: UserInfo) => UserInfo) | UserInfo) => void,
] => {
  const [user, setUser] = useState<UserInfo>({
    email: "",
    createTime: undefined,
    numberPost: 0,
    user_avatar: "",
    username: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserInfo(supabase.auth.user()?.id as string);

      if (data) {
        setUser({
          username: data[0].username,
          user_avatar: data[0].user_avatar,
          numberPost: data[0].number_post,
          createTime: data[0].create_at,
          email: data[0].email,
        });
      }
    };

    fetchUserData();
  }, []);

  return [user, setUser];
};

export default UseProfile;
