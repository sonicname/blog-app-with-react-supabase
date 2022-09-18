import { memo } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  title: string;
  description: string;
  author: string;
  thumbnail: string;
  id?: string;
}

const PostItem = ({ author, description, title, thumbnail, id }: IProps) => {
  return (
    <NavLink
      to={`/post/${id}`}
      className='block h-full duration-100 shadow-2xl select-none hover:opacity-60'
    >
      <div className='bg-[#1C1C24] rounded-lg h-full flex flex-col'>
        <div className='h-[250px] w-full rounded-t-lg overflow-hidden'>
          <img src={thumbnail} alt='' className='object-cover w-full h-full' />
        </div>
        <div className='flex flex-col flex-1 px-5 py-4'>
          <div className='flex flex-col gap-y-2'>
            <h3 className='text-lg font-semibold line-clamp-2'>{title}</h3>

            <p className='text-sm text-[#808191] line-clamp-1'>{description}</p>
          </div>

          <div className='mt-auto'>
            <span className='text-xs text-[#808191]'>by</span>{' '}
            <span className='font-semibold text-[#B2B3BD] text-xs'>
              {author}
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default memo(PostItem);
