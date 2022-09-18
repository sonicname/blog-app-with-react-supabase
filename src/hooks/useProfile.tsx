import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { IUser } from '../types/IUser';
import { supabase } from '../supabase/supabase';

export const useGetUserByID = (userID: string) => {
  return useQuery(['user', { userID }], async () => {
    const { data, error } = await supabase
      .from<IUser>('users')
      .select('*')
      .eq('id', userID)
      .single();

    if (error) {
      toast.error('Lấy thông tin người dùng thất bại!');
    }

    return data;
  });
};
