import React, { useEffect, useState } from "react";
import CommonLayout from "../components/layouts/CommonLayout";
import parser from "html-react-parser";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import { IPost } from "../types/IPost";
import Container from "../components/layouts/Container";
import { useGetPostById } from "../hooks/usePost";

interface IExtentPost extends IPost {
  user: { username: string };
}

const PostDetailPage = () => {
  const { postID } = useParams<string>();
  const post = useGetPostById(postID as string);

  return (
    <CommonLayout>
      <Container>
        <h1 className="font-semibold text-3xl mb-10">
          {post?.title} by{" "}
          <span className="font-bold !text-md text-purple-500">
            {post?.user.username}
          </span>
        </h1>
        <div className="content-box">
          {parser(`${post?.content as string}`)}
        </div>
      </Container>
    </CommonLayout>
  );
};

export default PostDetailPage;
