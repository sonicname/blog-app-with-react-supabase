import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import Heading from "../components/heading/Heading";
import ErrorInput from "../components/errors/ErrorInput";
import SubHeading from "../components/heading/SubHeading";
import AuthLayout from "../components/layouts/AuthLayout";

import { schema } from "../utils/schema";
import { useAuth } from "../context/supabase-context";
import { IAuthValue } from "../types/IAuth";

const SignUpPage = () => {
  const { signUp, session } = useAuth();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values: IAuthValue) => {
    try {
      await signUp(values);
    } catch (e) {
      toast.error("Có lỗi xảy ra! vui lòng thử lại!");
    }
  };

  if (session?.user) return <Navigate to={"/"} />;

  return (
    <AuthLayout>
      <div className="max-w-[556px] w-full shadow-md px-[30px] lg:px-[50px] py-[20px] lg:py-[63px] bg-[#1C1C24] rounded-lg">
        <Heading content={"Đăng ký tài khoản"}>
          <SubHeading content={"Đã có tài khoản rồi?"} hrefText={"Đăng nhập"} to={"/signin"} />
        </Heading>

        <form
          // @ts-ignore
          onSubmit={handleSubmit(handleSignUp)}
          className="mt-[20px] flex flex-col gap-y-[20px] lg:gap-y-[20px]"
        >
          <Field>
            <Label text={"Email"} htmlFor={"email"} />
            <Input
              type={"email"}
              control={control}
              name={"email"}
              placeholder="Nhập địa chỉ email của bạn"
            />
            {errors.email && (
              // @ts-ignore
              <ErrorInput>{errors?.email?.message}</ErrorInput>
            )}
          </Field>

          <Field>
            <Label text={"Password"} htmlFor={"password"} />
            <Input
              type={"password"}
              control={control}
              name={"password"}
              placeholder="Điền mật khẩu của bạn"
            />
            {errors.password && (
              // @ts-ignore
              <ErrorInput>{errors?.password?.message}</ErrorInput>
            )}
          </Field>

          <Button className="duration-75 active:scale-90" type={"submit"} disabled={isSubmitting}>
            Tạo tài khoản
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
