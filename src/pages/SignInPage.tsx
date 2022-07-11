import React from "react";
import CommonLayout from "../components/layouts/CommonLayout";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import ErrorInput from "../components/error/ErrorInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../supabase/supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { schema } from "../utils/schema";

interface IAccount {
  email?: string;
  password?: string;
}

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleSignIn = async (values: IAccount) => {
    if (!values.email || !values.password) return;
    const { error } = await supabase.auth.signIn({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error("Sai mật khẩu và tài khoản!");
    } else {
      toast.success("Đăng nhập thành công!");
      navigate("/");
    }
  };
  return (
    <CommonLayout>
      <div className="auth">
        <h3 className="auth__heading">Đăng Nhập</h3>
        <form className="auth__form" onSubmit={handleSubmit(handleSignIn)}>
          <div className="auth__field">
            <Label htmlFor={"email"} className={"auth__label"}>
              Email
            </Label>

            <Input
              name={"email"}
              type={"email"}
              placeholder={"Điền email của bạn"}
              control={control}
              className={"auth__input"}
            />

            {errors?.email?.message && (
              <ErrorInput message={errors.email.message as unknown as string} />
            )}
          </div>

          <div className="auth__field">
            <Label htmlFor={"password"} className={"auth__label"}>
              Mật khẩu
            </Label>

            <Input
              name={"password"}
              type={"password"}
              placeholder={"Điền mật khẩu của bạn"}
              control={control}
              className={"auth__input"}
            />
            {errors?.password?.message && (
              <ErrorInput
                message={errors.password.message as unknown as string}
              />
            )}
          </div>

          <div className="auth__wrapper">
            <button
              type="submit"
              className="auth__submit"
              disabled={isSubmitting}
            >
              Đăng Nhập
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
};

export default SignInPage;
