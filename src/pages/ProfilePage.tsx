import React, { useEffect, useState } from "react";
import CommonLayout from "../components/layouts/CommonLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { toast } from "react-toastify";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { getUserInfo } from "../utils/getUserInfo";
import { supabase } from "../supabase/supabase";

type UpdateValue = {
  username: string;
  user_avatar: string;
};

type ProfileParams = {
  userID: string;
};

type UserInfo = {
  username: string;
  email: string;
  user_avatar: string;
  createTime: Date | undefined;
  numberPost: number;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { userID } = useParams<ProfileParams>();
  const [user, setUser] = useState<UserInfo>({
    email: "",
    createTime: undefined,
    numberPost: 0,
    user_avatar: "",
    username: "",
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });

  const handleUpdateProfile = async (values: UpdateValue) => {
    if (isSubmitting) return;
    const { data, error } = await supabase
      .from("users")
      .update({
        username: values.username,
        user_avatar: values.user_avatar,
      })
      .eq("id", userID);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Cập nhật profile thành công!");
      setUser({
        ...user,
        username: data[0].username,
        user_avatar: data[0].user_avatar,
      });
    }
  };

  useEffect(() => {
    if (session?.user?.id !== userID) {
      toast.warning("Bạn không có quyền truy cập vào thông tin người khác!");
      return navigate("/");
    }
    const fetchUserData = async () => {
      const data = await getUserInfo(userID as string);

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

  return (
    <CommonLayout>
      <div className="profile">
        <div className="profile__header">
          <h1 className="profile__title">Thông tin {user.username}</h1>

          <img
            className="profile__avatar"
            src={
              user.user_avatar
                ? user.user_avatar
                : "https://cdn.nekobot.xyz/d/d/5/d23c5306ec9083284f0c3360d7b63.jpg"
            }
            alt=""
          />
        </div>

        <div style={{ paddingBottom: 20 }} className="profile__body">
          <form
            // @ts-ignore
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="auth__form"
          >
            <div className="auth__field">
              <Label htmlFor={"username"} className={"auth__label"}>
                Username
              </Label>
              <Input
                name={"username"}
                type={"text"}
                placeholder={user.username}
                control={control}
                className={"auth__input"}
              />
            </div>

            <div className="auth__field">
              <Label htmlFor={"user_avatar"} className={"auth__label"}>
                Avatar URL
              </Label>
              <Input
                name={"user_avatar"}
                type={"text"}
                placeholder={user.user_avatar}
                control={control}
                className={"auth__input"}
              />
            </div>

            <div className="auth__wrapper">
              <button
                className="auth__submit"
                type="submit"
                disabled={isSubmitting}
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </CommonLayout>
  );
};

export default ProfilePage;
