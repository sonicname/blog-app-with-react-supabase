import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";

import CommonLayout from "../components/layouts/CommonLayout";
import PostLayoutGrid from "../components/post/PostLayoutGrid";
import PostPagination from "../components/post/PostPagination";

import useChangePage from "../hooks/useChangePage";
import { useAuth } from "../context/supabase-context";
import { useCountPostsByAuthor, useGetPostsByAuthor } from "../hooks/usePost";

// TODO

const ProfilePage = () => {
  const { profileID } = useParams<string>();
  const { session, signOut } = useAuth();

  if (!session || !profileID || profileID !== session.user?.id) {
    toast.error("Vui lòng đăng nhập để tiếp tục!");
    return <Navigate to={"/"} />;
  }
  const { changePage, limit, page } = useChangePage(`/profile/${session.user.id}`);
  const { data: postList } = useGetPostsByAuthor(profileID, page);
  const { data: countPost } = useCountPostsByAuthor(profileID);

  return (
    <CommonLayout>
      <div className="flex flex-col gap-y-5 lg:gap-y-10">
        <h2 className="font-semibold text-center text-md lg:text-xl">
          Tài khoản: {session.user.email}
          <span
            onClick={() => signOut()}
            className="ml-2 text-green-300 cursor-pointer hover:underline"
          >
            đăng xuất
          </span>
        </h2>

        <div className="flex flex-col gap-y-5 lg:gap-y-10">
          <h2 className="text-lg font-semibold">Bài đăng</h2>
          {postList && <PostLayoutGrid postList={postList} />}
          {countPost && (
            <PostPagination changePage={changePage} perPage={limit} count={countPost} />
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default ProfilePage;
