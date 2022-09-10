import { useRef } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import PostEditor from "../components/editor/PostEditor";
import ErrorInput from "../components/errors/ErrorInput";
import CommonLayout from "../components/layouts/CommonLayout";

import { IPost } from "../types/IPost";
import { useAuth } from "../context/supabase-context";
import { supabase } from "../supabase/supabase";
import { schemaCreatePost } from "../utils/schema";

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
    const { error } = await supabase.from<IPost>("posts").insert({
      title: values.title,
      thumbnail: values.thumbnail,
      description: values.description,
      // @ts-ignore
      content: editorRef.current.getContent(),
      author_id: session?.user?.id,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Tạo bài viết thành công!");
      navigate("/");
    }
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-y-5">
        <h2 className="text-xl font-semibold text-center md:text-left">
          Tạo bài viết mới
        </h2>

        <form
          // @ts-ignore
          onSubmit={handleSubmit(handleCreatePost)}
          className="flex flex-col w-full gap-y-5"
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
