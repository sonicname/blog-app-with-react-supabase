import CommonLayout from "../components/layouts/CommonLayout";
import PostLayoutGrid from "../components/post/PostLayoutGrid";
import PostPagination from "../components/post/PostPagination";

import useChangePage from "../hooks/useChangePage";
import { useCountPosts, useGetPosts } from "../hooks/usePost";

const PostPage = () => {
  const { page, changePage, limit } = useChangePage("/posts");
  const { data: postList } = useGetPosts(page, limit);
  const { data: countPost } = useCountPosts();

  return (
    <CommonLayout>
      <div className="flex flex-col mt-4 gap-y-5 lg:gap-y-10">
        <section className="flex flex-col gap-y-5">
          <h2 className="font-semibold text-[16px] lg:text-[24px] flex items-baseline gap-x-3">
            {`Danh sách bài viết trang ${page}`}
          </h2>

          {postList && <PostLayoutGrid postList={postList} />}
          {countPost && (
            <PostPagination perPage={limit} changePage={changePage} count={countPost} />
          )}
        </section>
      </div>
    </CommonLayout>
  );
};

export default PostPage;
