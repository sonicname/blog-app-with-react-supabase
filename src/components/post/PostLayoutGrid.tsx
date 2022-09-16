import PostItem from "./PostItem";
import { IFullPost } from "../../types/IPost";

interface IPostLayoutProps {
  postList: IFullPost[] | undefined;
}

const PostLayoutGrid = ({ postList }: IPostLayoutProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-10">
      {postList &&
        postList.map((post) => (
          <PostItem
            key={post.id}
            title={post.title}
            description={post.description}
            author={post.user.username}
            id={post.id}
            thumbnail={post.thumbnail}
          />
        ))}
    </div>
  );
};

export default PostLayoutGrid;
