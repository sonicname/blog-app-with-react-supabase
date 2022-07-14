import { useAuth } from "../../context/supabase-context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const session = useAuth();
  return session ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default PrivateRouter;
