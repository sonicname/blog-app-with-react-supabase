import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { ChangeEvent, memo, useRef, useState } from 'react';

import ErrorComponent from './ErrorComponent';

import useDebounce from '../hooks/useDebounce';
import useSearchPosts from '../hooks/useSearchPosts';
import useOnClickOutside from '../hooks/useOnClickOutSide';

const NavSearch = () => {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');

  const resultRef = useRef(null);
  useOnClickOutside(resultRef, () => setShow(false));

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setShow(true);
    setKeyword(e.target.value);
  };

  const debouncedVal = useDebounce(keyword, 1000);

  const { isLoading, data } = useSearchPosts(debouncedVal);

  return (
    <div className='relative z-30 flex-1'>
      <input
        type='text'
        className='border border-[#3A3A43] rounded-md p-3 shadow outline-none text-white font-medium text-[14px] placeholder:text-[#4B5264] bg-transparent w-full'
        placeholder='Tìm kiếm bài viết...'
        onChange={handleChangeSearch}
      />

      <div
        className={classNames(
          'absolute w-full rounded-md !top-full flex flex-col mt-2 bg-[#181818c9] duration-150 h-fit',
          show ? 'scale-100' : 'scale-0',
        )}
        ref={resultRef}
      >
        {isLoading && (
          <div className='flex items-center justify-center p-2 bg-gray-700 rounded-md bg-opacity-70 lg:p-4'>
            <div className='w-4 h-4 border-4 rounded-full lg:w-6 lg:h-6 border-t-transparent animate-spin' />
          </div>
        )}

        {data &&
          data.map((post) => (
            <NavLink
              key={post.id}
              className='flex items-center justify-between p-2 rounded-md hover:bg-slate-500'
              to={`/post/${post.id}`}
            >
              {post.title}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default memo(
  withErrorBoundary(NavSearch, {
    FallbackComponent: ErrorComponent,
  }),
);
