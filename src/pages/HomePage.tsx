import React, { useEffect, useState } from "react";
import CommonLayout from "../components/layouts/CommonLayout";
import PostItem from "../modules/Post/PostItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { IPost } from "../types/IPost";
import { supabase } from "../supabase/supabase";

const HomePage = () => {
  const [posts, setPosts] = useState<IPost[] | null>([]);
  useEffect(() => {
    const getPosts = async () => {
      const { data: posts, error } = await supabase
        .from<IPost>("posts")
        .select("*")
        .limit(10);

      setPosts(posts);
    };

    getPosts();
  }, []);

  return (
    <CommonLayout>
      <div className="flex flex-col gap-y-5 lg:gap-y-10 mt-4">
        <section className="flex flex-col gap-y-5">
          <h2 className="font-semibold text-[18px]">Bài viết mới nhất</h2>
          <Swiper spaceBetween={30} slidesPerView={"auto"} grabCursor={true}>
            {posts?.map((post) => (
              <SwiperSlide key={post.id}>
                <PostItem
                  title={post.title}
                  description={post.description}
                  author={post.author}
                  slug={`/post/${post.slug}`}
                  thumbnail={post.thumbnail}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </CommonLayout>
  );
};

export default HomePage;
