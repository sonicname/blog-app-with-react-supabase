import Button from "../components/button/Button";
import CommonLayout from "../components/layouts/CommonLayout";
import PostLayoutGrid from "../components/post/PostLayoutGrid";
import PostPagination from "../components/post/PostPagination";

import useNextPage from "../hooks/useNextPage";

const PostPage = () => {
  const { postList, isLoading, page, changePage, limit } = useNextPage("/posts");

  return (
    <CommonLayout>
      <div className="flex flex-col mt-4 gap-y-5 lg:gap-y-10">
        <section className="flex flex-col gap-y-5">
          <h2 className="font-semibold text-[16px] lg:text-[24px] flex items-baseline gap-x-3">
            {`Danh sách bài viết trang ${page}`}
          </h2>

          {!isLoading && postList && <PostLayoutGrid postList={postList} />}
          <PostPagination perPage={limit} changePage={changePage} />
        </section>
      </div>
    </CommonLayout>
  );
};

export default PostPage;
