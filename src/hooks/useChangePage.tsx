import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useQuery from "./useQuery";
import { useGetPosts } from "./usePost";

const useChangePage = (slug: string = "", limit?: number) => {
  let query = useQuery();
  const navigate = useNavigate();

  const page = query.get("page") ? parseInt(query.get("page") as string) : 1;
  const { data: postList, isLoading, isError } = useGetPosts(page, limit);

  if (isError) {
    toast.error("Có lỗi xảy ra vui lòng thử lại!");
    navigate("/");
  }

  if (postList?.length === 0) {
    toast.info("Bạn đã xem hết bài đăng!");
    navigate(`${slug}?page=1`);
  }

  const changePage = (pageToChange: number) => navigate(`${slug}?page=${pageToChange}`);

  return { postList, isLoading, page, changePage, limit };
};

export default useChangePage;
