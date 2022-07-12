import CommonLayout from "../components/layouts/CommonLayout";
import { toast } from "react-toastify";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { supabase } from "../supabase/supabase";
import useProfile from "../hooks/useProfile";

type UpdateValue = {
  username: string;
  user_avatar: string;
};

const ProfilePage = () => {
  const [user, setUser] = useProfile();

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
      .eq("id", supabase.auth.user()?.id);

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
