import { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { supabase } from '../config/supabase';

interface IAuthContext {
  session: Session | null;
}

const SupabaseContext = createContext<IAuthContext>({
  session: null,
});

export const AuthProvider = (props: any) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    const { data: listener } = supabase.auth.onAuthStateChange(async (_: any, session) => {
      setSession(session);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, [session]);

  const valueMemo = useMemo(() => ({ session }), [session]);

  return <SupabaseContext.Provider value={valueMemo} {...props} />;
};

export const useAuth = () => {
  const context = useContext(SupabaseContext);
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within AuthProvider!');
  }

  return context;
};
