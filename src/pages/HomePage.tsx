import { NavLink } from "react-router-dom";

import PostItem from "../components/post/PostItem";
import { useNewestPost } from "../hooks/usePost";
import CommonLayout from "../components/layouts/CommonLayout";
import { toast } from "react-toastify";

const HomePage = () => {
  const { data, error, isLoading } = useNewestPost();

  if (error) {
    toast.error("Có lỗi xảy ra vui lòng thử lại!");
  }

  return (
    <CommonLayout>
      <div className="flex flex-col mt-4 gap-y-5 lg:gap-y-10">
        <section className="flex flex-col gap-y-5">
          <h2 className="font-semibold text-[16px] lg:text-[24px] flex items-baseline gap-x-3">
            Bài viết mới nhất{" "}
            <NavLink
              to={"/posts"}
              className="font-bold text-green-500 text-[14px] lg:text-[16px]"
            >
              xem thêm
            </NavLink>
          </h2>

          {!isLoading && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-x-5 lg:grid-cols-4 lg:gap-y-10 lg:gap-x-10">
              {data?.map((post) => (
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
        </section>
      </div>
    </CommonLayout>
  );
};

export default HomePage;
