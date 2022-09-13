import Button from "../components/button/Button";
import CommonLayout from "../components/layouts/CommonLayout";
import PostLayoutGrid from "../components/post/PostLayoutGrid";

import useNextPage from "../hooks/useNextPage";

const PostPage = () => {
  const { postList, isLoading, nextPage, page } = useNextPage("/posts");

  return (
    <CommonLayout>
      <div className="flex flex-col mt-4 gap-y-5 lg:gap-y-10">
        <section className="flex flex-col gap-y-5">
          <h2 className="font-semibold text-[16px] lg:text-[24px] flex items-baseline gap-x-3">
            {`Danh sách bài viết trang ${page}`}
          </h2>

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
