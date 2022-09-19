import ReactPaginate from 'react-paginate';

interface IPostPaginationProps {
  perPage?: number;
  count: number;
  changePage: (pageToChange: number) => void;
}

const PostPagination = ({
  perPage = 7,
  changePage,
  count,
}: IPostPaginationProps) => {
  return (
    <ReactPaginate
      className='flex items-center justify-center gap-x-5'
      nextLabel='>'
      previousLabel='<'
      pageRangeDisplayed={3}
      onPageChange={(e) => changePage(e.selected + 1)}
      activeClassName='bg-green-400 text-black rounded-md'
      pageLinkClassName='p-2'
      pageClassName='p-2'
      breakLabel='...'
      disabledClassName='opacity-70'
      pageCount={Math.ceil(count / perPage)}
    />
  );
};

export default PostPagination;
