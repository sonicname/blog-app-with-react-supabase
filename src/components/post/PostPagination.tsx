import ReactPaginate from "react-paginate";

interface IPostPaginationProps {
  perPage?: number;
  count: number;
  changePage: (pageToChange: number) => void;
}

const PostPagination = ({ perPage = 7, changePage, count }: IPostPaginationProps) => {
  const handleChangePage = (e: { selected: number }) => {
    changePage(e.selected + 1);
  };

  return (
    <ReactPaginate
      className="flex items-center justify-center gap-x-5"
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={3}
      onPageChange={handleChangePage}
      activeClassName="bg-green-400 text-black rounded-md"
      pageLinkClassName="p-2"
      pageClassName="p-2"
      breakLabel="..."
      disabledClassName="opacity-70"
      pageCount={Math.round(count / perPage)}
    />
  );
};

export default PostPagination;
