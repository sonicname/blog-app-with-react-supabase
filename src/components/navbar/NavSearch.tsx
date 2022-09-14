import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { IPost } from "../../types/IPost";

import useDebounce from "../../hooks/useDebounce";
import useOnClickOutside from "../../hooks/useOnClickOutSide";
import { getPostWithTitle } from "../../hooks/usePost";

// TODO

const NavSearch = () => {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [posts, setPosts] = useState<IPost[]>([]);

  const resultRef = useRef(null);
  useOnClickOutside(resultRef, () => setShow(false));

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setShow(true);
    setKeyword(e.target.value);
  };

  const debouncedVal = useDebounce(keyword, 1000);

  useEffect(() => {
    if (!debouncedVal) return;
    getPostWithTitle(debouncedVal).then((result) => setPosts(result));
  }, [debouncedVal]);

  return (
    <div className="relative z-30 flex-1">
      <input
        type="text"
        className="border border-[#3A3A43] rounded-md p-3 shadow outline-none text-white font-medium text-[14px] placeholder:text-[#4B5264] bg-transparent w-full"
        placeholder="Tìm kiếm bài viết..."
        onChange={handleChangeSearch}
      />

      <div
        className={classNames(
          "absolute w-full rounded-md !top-full flex flex-col mt-2 bg-[#181818] duration-150 h-fit z-30",
          show ? "scale-100" : "scale-0",
        )}
        ref={resultRef}
      >
        {posts &&
          posts.map((post) => (
            <NavLink
              key={post.slug}
              className="flex items-center justify-between p-2 rounded-md hover:bg-slate-500"
              to={`/post/${post.slug}`}
            >
              {post.title}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default NavSearch;
