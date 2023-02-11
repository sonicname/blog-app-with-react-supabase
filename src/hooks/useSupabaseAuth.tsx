import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../config/supabase';

interface IAuthValue {
  email: string;
  password: string;
}

const useSupabaseAuth = () => {
  const navigate = useNavigate();

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

  return { signIn, signUp, signOut };
};

export default useSupabaseAuth;
