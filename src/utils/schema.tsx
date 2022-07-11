import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .required("Email không được để trống!")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải dài hơn 8 kí tự"),
});
