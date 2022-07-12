import React, { useState } from "react";
import CommonLayout from "../components/layouts/CommonLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IPostContent {
  title: string;
  thumbnail: string;
  content: string;
}

const UploadPage = () => {
  const [post, setPost] = useState<IPostContent>({
    content: "",
    thumbnail: "",
    title: "",
  });

  const handleUploadPost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(post);
  };

  return (
    <CommonLayout>
      <div className="upload">
        <h3 className="upload__heading">Đăng bài viết</h3>

        <div className="upload__body">
          <form className="upload__form" onSubmit={handleUploadPost}>
            <div className="upload__field">
              <label className="upload__label" htmlFor="title">
                Tiêu đề bài viết
              </label>
              <input
                type="text"
                name="title"
                className="upload__input"
                placeholder="Nhập tiêu đề bài viết của bạn"
                onChange={(e) =>
                  setPost({
                    ...post,
                    title: e.target.title,
                  })
                }
              />
            </div>

            <div className="upload__field">
              <label className="upload__label" htmlFor="title">
                Thumbnail
              </label>
              <input
                type="url"
                name="thumbnail"
                className="upload__input"
                placeholder="Nhập url thumbnail"
                onChange={(e) =>
                  setPost({
                    ...post,
                    thumbnail: e.target.value,
                  })
                }
              />
            </div>

            <div className="upload__field">
              <label className="upload__label" htmlFor="title">
                Nội dung bài viết (markdown)
              </label>
              <textarea
                name="content"
                className="upload__input"
                placeholder="Có hỗ trợ markdown"
                rows={8}
                onChange={(e) =>
                  setPost({
                    ...post,
                    content: e.target.value,
                  })
                }
              />
            </div>

            <div className="upload__preview">
              <h3 className="upload__preview-heading">Xem trước bài viết</h3>
              <div className="upload__preview-wrapper">
                <ReactMarkdown
                  children={post.content}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
            </div>

            <div className="upload__btn-wrapper">
              <button type="submit" className="upload__submit">
                Đăng bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </CommonLayout>
  );
};

export default UploadPage;
