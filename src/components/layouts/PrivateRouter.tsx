import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../context/supabase-context';

interface IProps {
  children: ReactNode;
}

const PrivateRouter = ({ children }: IProps) => {
  const { session } = useAuth();

  if (!session?.user) return <Navigate to={'/signin'} />;
  return <>{children}</>;
};

export default PrivateRouter;
