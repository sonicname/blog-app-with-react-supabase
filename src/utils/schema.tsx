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

export const schemaCreatePost = yup.object({
  title: yup
    .string()
    .required("Tiêu đề không được để trống!")
    .min(3, "Tiêu đề phải dài hơn 3 kí tự")
    .max(30, "Tiêu đề không được quá 30 kí tự"),
  thumbnail: yup.string().required("Thumbnail không được để trống"),
  content: yup.string().min(5, "Nội dung phải dài hơn 5 kí tự!"),
  description: yup.string().required("Mô tả không được để trống!"),
});
