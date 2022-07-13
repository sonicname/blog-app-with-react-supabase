import React from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import Heading from "../components/heading/Heading";
import SubHeading from "../components/heading/SubHeading";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import { FieldValue, useForm } from "react-hook-form";
import Button from "../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/schema";
import ErrorInput from "../components/errors/ErrorInput";
import { toast } from "react-toastify";
import { log } from "util";

type SignUpValue = {
  email: string;
  password: string;
};

const SignUpPage = () => {
  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values: FieldValue<SignUpValue>) => {
    console.log(values);
  };

  return (
    <AuthLayout>
      <div className="max-w-[556px] w-full shadow-md px-[30px] lg:px-[50px] py-[20px] lg:py-[63px]">
        <Heading content={"Sign Up"}>
          <SubHeading
            content={"Already have an account?"}
            hrefText={"Sign In"}
            to={"/signin"}
          />
        </Heading>

        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="mt-[20px] flex flex-col gap-y-[20px] lg:gap-y-[20px]"
        >
          <Field>
            <Label text={"Email"} htmlFor={"email"} />
            <Input
              type={"email"}
              control={control}
              name={"email"}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
            {errors.password && (
              // @ts-ignore
              <ErrorInput>{errors?.password?.message}</ErrorInput>
            )}
          </Field>

          <Button type={"submit"} disabled={isSubmitting}>
            Sign Up
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
