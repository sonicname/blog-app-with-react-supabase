import { memo } from "react";

const ErrorComponent = () => {
  return (
    <div className="flex items-center justify-center w-full h-full text-red-500 bg-black">
      Có lỗi xảy ra với component! vui lòng thử lại
    </div>
  );
};

export default memo(ErrorComponent);
