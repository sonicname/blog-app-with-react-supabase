import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const PrivateRouter = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      navigate("/signup");
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRouter;
