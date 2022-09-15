import ReactPaginate from "react-paginate";

import { useCountPosts } from "../../hooks/usePost";

interface IPostPaginationProps {
  perPage?: number;
  changePage: (pageToChange: number) => void;
}

const PostPagination = ({ perPage = 7, changePage }: IPostPaginationProps) => {
  const { data: countPosts } = useCountPosts();

  const handleChangePage = (e: { selected: number }) => {
    changePage(e.selected + 1);
  };

  return countPosts ? (
    <ReactPaginate
      className="flex items-center justify-center gap-x-5"
      previousLabel="<"
      nextLabel=">"
      pageRangeDisplayed={3}
      onPageChange={handleChangePage}
      activeClassName="bg-green-400 text-black rounded-md"
      pageLinkClassName="p-2"
      pageClassName="p-2"
      breakLabel="..."
      disabledClassName="opacity-70"
      pageCount={Math.ceil(countPosts / perPage)}
    />
  ) : (
    <div className="flex items-center justify-center">
      <span className="border-2 rounded-full border-t-transparent animate-spin" />
    </div>
  );
};

export default PostPagination;
