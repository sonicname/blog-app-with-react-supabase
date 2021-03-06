import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Session } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IAuthContext, IAuthValue } from "../types/IAuth";
import { IUser } from "../types/IUser";

const SupabaseContext = createContext<IAuthContext>({
  session: null,
  signIn: () =>
    new Promise((resolve, reject) => reject("Sign in method is empty!")),
  signUp: () =>
    new Promise((resolve, reject) => reject("Sign up method is empty!")),
  signOut: () =>
    new Promise((resolve, reject) => reject("Sign out method is empty!")),
});

export const AuthProvider = (props: any) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  const signIn = async ({ email, password }: IAuthValue): Promise<void> => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Đăng nhập thành công!");
      navigate("/");
    }
  };

  const signUp = async ({ email, password }: IAuthValue): Promise<void> => {
    const { error, user } = await supabase.auth.signUp({
      email,
      password,
    });

    await supabase.from<IUser>("users").insert({
      id: user?.id,
      email: user?.email,
      username: user?.email?.split("@")[0],
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Đăng nhập thành công!");
      navigate("/");
    }
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setSession(supabase.auth.session());
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
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
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider!");
  }

  return context;
};
