import { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorComponent from '../errors/ErrorComponent';

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
      className='flex items-center justify-center gap-x-2 lg:gap-x-5'
      nextLabel='>'
      previousLabel='<'
      pageRangeDisplayed={3}
      onPageChange={(e) => changePage(e.selected + 1)}
      activeClassName='bg-green-500 text-black font-bold rounded-lg'
      pageLinkClassName='p-2 font-semibold'
      pageClassName='p-2'
      breakLabel='...'
      disabledClassName='opacity-40'
      pageCount={Math.ceil(count / perPage)}
    />
  );
};

export default memo(
  withErrorBoundary(PostPagination, {
    FallbackComponent: ErrorComponent,
  }),
);
