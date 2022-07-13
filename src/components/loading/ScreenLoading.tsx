import React from "react";

const ScreenLoading = () => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center">
      <div className="w-[35px] lg:w-[70px] h-[35px] lg:h-[70px] rounded-full border-4 border-t-transparent animate-spin" />
    </div>
  );
};

export default ScreenLoading;
