import CommonLayout from "../components/layouts/CommonLayout";
import PostItem from "../modules/Post/PostItem";
import { useNewestPost } from "../hooks/usePost";

const HomePage = () => {
  const newestPost = useNewestPost();

  return (
    <CommonLayout>
      <div className="flex flex-col gap-y-5 lg:gap-y-10 mt-4">
        <section className="flex flex-col gap-y-5">
          <h2 className="font-semibold text-[16px] lg:text-[24px]">
            Bài viết mới nhất
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-5 lg:grid-cols-5 gap-y-5 lg:gap-x-5">
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
