import React, { useEffect } from "react";
import CommonLayout from "../components/layouts/CommonLayout";
import { supabase } from "../supabase/supabase";

const HomePage = () => {
  useEffect(() => {
    console.log(supabase.auth.user());
  }, []);
  return (
    <CommonLayout>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad,
      assumenda atque consequuntur cum debitis eaque error fuga illo ipsa iste
      nesciunt officiis quas quidem repudiandae sapiente suscipit totam
      voluptas.
    </CommonLayout>
  );
};

export default HomePage;
