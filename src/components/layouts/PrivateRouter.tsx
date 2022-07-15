import { useAuth } from "../../context/supabase-context";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const PrivateRouter = ({ children }: IProps) => {
  const session = useAuth();

  if (!session) return <Navigate to={"/signin"} />;
  return <>{children}</>;
};

export default PrivateRouter;
