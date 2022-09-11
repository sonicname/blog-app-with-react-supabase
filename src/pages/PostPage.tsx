import { useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";

import PostItem from "../components/post/PostItem";
import CommonLayout from "../components/layouts/CommonLayout";
import Button from "../components/button/Button";

import { useGetPosts } from "../hooks/usePost";

const LIMIT = 7;

const PostPage = () => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(LIMIT);
  const { data, isLoading, isError } = useGetPosts(skip, limit);

  if (isError) {
    toast.error("Có lỗi xảy ra vui lòng thử lại!");
  }

  if (!isLoading && data?.length === 0) {
    toast.info("Bạn đã xem hết bài đăng rồi!");
    setLimit((preVal) => (preVal -= LIMIT));
    setSkip((preVal) => (preVal -= LIMIT));
    return;
  }

  return (
    <CommonLayout>
      <div className="flex flex-col mt-4 gap-y-5 lg:gap-y-10">
        <section className="flex flex-col gap-y-5">
          <div className="flex flex-col items-start w-full lg:flex-row lg:items-center lg:justify-between gap-y-4">
            <h2 className="font-semibold text-[16px] lg:text-[24px] flex items-baseline gap-x-3">
              Danh sách bài viết{" "}
            </h2>

            <input
              type={"text"}
              className={classNames(
                "border border-[#3A3A43] rounded-md max-w-full w-full lg:max-w-[300px] p-[15px] shadow outline-none text-white font-medium text-[14px] placeholder:text-[#4B5264] bg-transparent",
              )}
              placeholder={"Nhập title bài viết..."}
            />
          </div>

          {!isLoading && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-x-5 lg:grid-cols-4 lg:gap-y-10 lg:gap-x-10">
              {data &&
                data.map((post) => (
                  <PostItem
                    key={post.id}
                    title={post.title}
                    description={post.description}
                    author={post.user.username}
                    slug={`/post/${post.slug}`}
                    thumbnail={post.thumbnail}
                  />
                ))}
            </div>
          )}

          <div className="max-w-[500px] w-full mx-auto">
            <Button
              onClick={() => {
                setSkip((preVal) => (preVal += LIMIT + 1));
                setLimit((preVal) => (preVal += LIMIT));
              }}
              type="button"
            >
              Xem thêm
            </Button>
          </div>
        </section>
      </div>
    </CommonLayout>
  );
};

export default PostPage;
