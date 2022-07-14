import React, { useEffect } from "react";
import CommonLayout from "../components/layouts/CommonLayout";

const HomePage = () => {
  useEffect(() => {
    document.title = "Trang chủ blog";
  }, []);

  return (
    <CommonLayout>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
      blanditiis consequuntur cum eligendi eos excepturi id incidunt laudantium
      minus, nam, nisi nostrum officia, quaerat recusandae tempora unde veniam!
      Asperiores, culpa.
    </CommonLayout>
  );
};

export default HomePage;
