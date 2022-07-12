import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IProps {
  children: ReactNode;
}

const PrivateRouter = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      toast.warning("Đăng nhập chưa bạn ơi!");
      navigate("/signup");
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRouter;
