import classNames from "classnames";

import Button from "../components/button/Button";
import CommonLayout from "../components/layouts/CommonLayout";
import PostLayoutGrid from "../components/post/PostLayoutGrid";

import useNextPage from "../hooks/useNextPage";

const PostPage = () => {
  const { postList, isLoading, nextPage } = useNextPage("/posts");
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

          {!isLoading && <PostLayoutGrid postList={postList} />}

          <div className="max-w-[500px] w-full mx-auto">
            <Button onClick={nextPage} type="button">
              Xem thêm
            </Button>
          </div>
        </section>
      </div>
    </CommonLayout>
  );
};

export default PostPage;
