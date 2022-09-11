import classNames from "classnames";
import { NavLink } from "react-router-dom";

import PostItem from "../components/post/PostItem";
import CommonLayout from "../components/layouts/CommonLayout";

import { useGetPosts } from "../hooks/usePost";

export default function PostPage() {
  const [posts, setLimit] = useGetPosts();

  return (
    <CommonLayout>
      <div className="flex flex-col mt-4 gap-y-5 lg:gap-y-10">
        <section className="flex flex-col gap-y-5">
          <h2 className="font-semibold text-[16px] lg:text-[24px] flex items-baseline gap-x-3">
            Danh sách bài viết{" "}
            <NavLink
              to={"/posts"}
              className="font-bold text-green-500 text-[14px] lg:text-[16px]"
            >
              xem thêm
            </NavLink>
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-x-5 lg:grid-cols-4 lg:gap-y-10 lg:gap-x-10">
            {posts?.map((post) => (
              <PostItem
                key={post.id}
                title={post.title}
                description={post.description}
                author={post.user.username}
                slug={`/post/${post.slug}`}
                thumbnail={post.thumbnail}
              />
            ))}

            <div
              className={classNames(
                "w-full h-full flex items-center justify-center bg-slate-500 text-white rounded-lg font-semibold text-xl hover:opacity-60 duration-200 cursor-pointer",
              )}
              onClick={() =>
                setLimit((currentPage: number) => (currentPage += 5))
              }
            >
              Xem thêm
            </div>
          </div>
        </section>
      </div>
    </CommonLayout>
  );
}
