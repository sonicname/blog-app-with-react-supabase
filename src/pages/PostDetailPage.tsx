import CommonLayout from "../components/layouts/CommonLayout";
import parser from "html-react-parser";
import { useParams } from "react-router-dom";
import Container from "../components/layouts/Container";
import { useGetPostById } from "../hooks/usePost";

const PostDetailPage = () => {
  const { postID } = useParams<string>();
  const post = useGetPostById(postID as string);

  return (
    <CommonLayout>
      <Container className="md:relative">
        <h1 className="font-semibold text-3xl mb-2">{post?.title}</h1>

        <div className="mb-10 text-sm font-medium">
          {new Date(post?.created_at as Date).toLocaleDateString()} - by -{" "}
          <span className="font-bold !text-md text-purple-500">
            {post?.user.username}
          </span>
        </div>

        <div className="content-box">
          {parser(`${post?.content as string}`)}
        </div>
      </Container>
    </CommonLayout>
  );
};

export default PostDetailPage;
