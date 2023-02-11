import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../context/supabase-context';

interface IProps {
  children: ReactNode;
}

const PrivateRouter = ({ children }: IProps) => {
  const { session } = useAuth();
  if (!session || !session.user) return <Navigate to={'/auth/signin'} />;

  return <>{children}</>;
};

export default PrivateRouter;
