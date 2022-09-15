import parser from "html-react-parser";
import { Navigate, useParams } from "react-router-dom";

import CommonLayout from "../components/layouts/CommonLayout";
import Container from "../components/layouts/Container";

import { useGetPostById } from "../hooks/usePost";

const PostDetailPage = () => {
  const { postID } = useParams<string>();
  const { data, isLoading, error } = useGetPostById(postID as string);

  if (error) {
    return Navigate({ to: "/" });
  }

  return (
    <CommonLayout>
      {!isLoading && (
        <>
          <Container className="flex flex-col gap-y-5">
            {data && (
              <>
                <img src={data?.thumbnail} className="w-full h-[250px] object-cover rounded-md" alt="" />
                <h1 className="text-3xl font-semibold text-center">{data?.title}</h1>
                <div className="text-sm font-medium">
                  {new Date(data?.created_at as Date).toLocaleDateString()} - by -{" "}
                  <span className="font-bold !text-md text-purple-500">{data?.user.username}</span>
                </div>
                <div className="content-box">{parser(`${data?.content as string}`)}</div>
              </>
            )}
          </Container>
        </>
      )}
    </CommonLayout>
  );
};

export default PostDetailPage;
