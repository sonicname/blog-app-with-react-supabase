import { memo } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  title: string;
  description: string;
  author: string;
  slug: string;
  thumbnail: string;
}

const PostItem = ({ author, description, title, slug, thumbnail }: IProps) => {
  return (
    <NavLink to={slug} className="block h-full shadow-2xl select-none">
      <div className="bg-[#1C1C24] rounded-lg h-full flex flex-col">
        <div className="h-[250px] w-full rounded-lg overflow-hidden">
          <img
            src={thumbnail}
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="px-[20px] py-[15px] flex-1 flex flex-col">
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold text-[16px] line-clamp-2">{title}</h3>

            <p className="text-[12px] text-[#808191] mt-[5px] line-clamp-1">
              {description}
            </p>
          </div>

          <div className="mt-auto">
            <span className="text-[12px] text-[#808191]">by</span>{" "}
            <span className="font-semibold text-[#B2B3BD] text-[12px]">
              {author}
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default memo(PostItem);
