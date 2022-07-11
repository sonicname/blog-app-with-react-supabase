import React from "react";
import CommonLayout from "../components/layouts/CommonLayout";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import ErrorInput from "../components/error/ErrorInput";
import { supabase } from "../supabase/supabase";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup
    .string()
    .required("Email không được để trống!")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải dài hơn 8 kí tự"),
});

interface IAccount {
  email?: string;
  password?: string;
}

const SignUpPage = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values: IAccount) => {
    if (!values.email || !values.password) return;
    const { user, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error("Đăng ký tài khoản thất bại! Vui lòng thử lại sau!");
    } else {
      toast.success("Đăng ký tài khoản thành công!");
    }

    console.log(user);
  };

  return (
    <CommonLayout>
      <div className="signup">
        <h3 className="signup__heading">Đăng ký tài khoản</h3>
        <form className="signup__form" onSubmit={handleSubmit(handleSignUp)}>
          <div className="signup__field">
            <Label htmlFor={"email"} className={"signup__label"}>
              Email
            </Label>

            <Input
              name={"email"}
              type={"email"}
              placeholder={"Điền email của bạn"}
              control={control}
              className={"signup__input"}
            />

            {errors?.email?.message && (
              <ErrorInput message={errors.email.message as unknown as string} />
            )}
          </div>

          <div className="signup__field">
            <Label htmlFor={"password"} className={"signup__label"}>
              Mật khẩu
            </Label>

            <Input
              name={"password"}
              type={"password"}
              placeholder={"Điền mật khẩu của bạn"}
              control={control}
              className={"signup__input"}
            />
            {errors?.password?.message && (
              <ErrorInput
                message={errors.password.message as unknown as string}
              />
            )}
          </div>

          <div className="signup__wrapper">
            <button
              type="submit"
              className="signup__submit"
              disabled={isSubmitting}
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
};

export default SignUpPage;
