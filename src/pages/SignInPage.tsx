import { useEffect } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import Heading from "../components/heading/Heading";
import SubHeading from "../components/heading/SubHeading";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import ErrorInput from "../components/errors/ErrorInput";
import Button from "../components/button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { schema } from "../utils/schema";
import { useAuth } from "../context/supabase-context";
import { IAuthValue } from "../types/IAuth";

const SignInPage = () => {
  const { signIn, session } = useAuth();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const handleSignIn = async (values: IAuthValue) => {
    try {
      await signIn(values);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-[556px] w-full shadow-md px-[30px] lg:px-[50px] py-[20px] lg:py-[63px] bg-[#1C1C24] rounded-lg">
        <Heading content={"Đăng Nhập"}>
          <SubHeading
            content={"Chưa có tài khoản?"}
            hrefText={"Đăng ký ngay"}
            to={"/signup"}
          />
        </Heading>

        <form
          // @ts-ignore
          onSubmit={handleSubmit(handleSignIn)}
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
            {
              // @ts-ignore
              errors.email && <ErrorInput>{errors?.email?.message}</ErrorInput>
            }
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

          <Button
            className="active:scale-90 duration-75"
            type={"submit"}
            disabled={isSubmitting}
          >
            Đăng Nhập
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
