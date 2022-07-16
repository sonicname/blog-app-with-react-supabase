import { useRef } from "react";
import CommonLayout from "../components/layouts/CommonLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCreatePost } from "../utils/schema";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import ErrorInput from "../components/errors/ErrorInput";
import { IPost } from "../types/IPost";
import { useAuth } from "../context/supabase-context";
import { useNavigate } from "react-router-dom";
import { createPost } from "../utils/createPost";
import PostEditor from "../components/editor/PostEditor";

const CreatePostPage = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schemaCreatePost),
  });

  const handleCreatePost = async (values: IPost) => {
    await createPost(values, session, navigate);
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-y-5">
        <h2 className="font-semibold text-xl text-center md:text-left">
          Tạo bài viết mới
        </h2>

        <form
          // @ts-ignore
          onSubmit={handleSubmit(handleCreatePost)}
          className="w-full flex flex-col gap-y-5"
        >
          <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-10">
            <Field>
              <Label text={"Tiêu đề bài viết"} htmlFor={"title"} />
              <Input
                type={"text"}
                control={control}
                placeholder={"Nhập tiêu đề bài viết"}
                name={"title"}
              />
              {errors.title && (
                // @ts-ignore
                <ErrorInput>{errors?.title?.message}</ErrorInput>
              )}
            </Field>

            <Field>
              <Label text={"Thumbnail"} htmlFor={"thumbnail"} />
              <Input
                type={"url"}
                control={control}
                placeholder={"Nhập thumbnail"}
                name={"thumbnail"}
              />
              {errors.thumbnail && (
                // @ts-ignore
                <ErrorInput>{errors?.thumbnail?.message}</ErrorInput>
              )}
            </Field>

            <Field>
              <Label text={"Mô tả"} htmlFor={"description"} />
              <Input
                type={"text"}
                control={control}
                placeholder={"Nhập mô tả"}
                name={"description"}
              />
              {errors.description && (
                // @ts-ignore
                <ErrorInput>{errors?.description?.message}</ErrorInput>
              )}
            </Field>
          </div>

          <Field>
            <Label text={"Nội dung"} htmlFor={"content"} />

            <PostEditor
              editorRef={editorRef}
              initialValue={"<h1>Nhập nội dung bài viết</h1>"}
              height={500}
              menubar={true}
            />
          </Field>

          <div className="max-w-[200px] flex items-center justify-center">
            <Button type={"submit"}>Tạo bài viết</Button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
};

export default CreatePostPage;
