import CommonLayout from "../components/layouts/CommonLayout";
import PostItem from "../modules/Post/PostItem";
import { useNewestPost } from "../hooks/usePost";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const newestPost = useNewestPost();

  return (
    <CommonLayout>
      <div className="flex flex-col gap-y-5 lg:gap-y-10 mt-4">
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

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-x-5 lg:grid-cols-4 lg:gap-y-10 lg:gap-x-10">
            {newestPost?.map((post) => (
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
        </section>
      </div>
    </CommonLayout>
  );
};

export default HomePage;
