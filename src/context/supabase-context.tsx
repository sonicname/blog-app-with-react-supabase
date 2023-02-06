import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';

import { supabase } from '../config/supabase';

import { IUser } from '../typings';

interface IAuthValue {
  email: string;
  password: string;
}

interface IAuthContext {
  session: Session | null;
  signIn: (values: IAuthValue) => Promise<void>;
  signUp: (values: IAuthValue) => Promise<void>;
  signOut: () => Promise<void>;
}

const SupabaseContext = createContext<IAuthContext>({
  session: null,
  signIn: () => new Promise((_, reject) => reject('Sign in method is empty!')),
  signUp: () => new Promise((_, reject) => reject('Sign up method is empty!')),
  signOut: () => new Promise((_, reject) => reject('Sign out method is empty!')),
});

export const AuthProvider = (props: any) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  const signIn = async ({ email, password }: IAuthValue) => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Đăng nhập thành công!');
      navigate('/');
    }
  };

  const signUp = async ({ email, password }: IAuthValue) => {
    const { error, user } = await supabase.auth.signUp({
      email,
      password,
    });

    await supabase.from('users').insert({
      id: user?.id,
      email: user?.email,
      username: user?.email?.split('@')[0],
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Đăng ký thành công!');
      navigate('/');
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
  };

  useEffect(() => {
    setSession(supabase.auth.session());
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_: any, session: SetStateAction<Session | null>) => {
        setSession(session);
      },
    );

    return () => {
      listener?.unsubscribe();
    };
  }, [session]);

  const value = {
    session,
    signIn,
    signUp,
    signOut,
  };

  return <SupabaseContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(SupabaseContext);
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within AuthProvider!');
  }

  return context;
};
