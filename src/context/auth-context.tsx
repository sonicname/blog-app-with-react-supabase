import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Session } from "@supabase/supabase-js";

interface IContext {
  session: Session | null;
}

const AuthContext = createContext<IContext>({
  session: null,
});

export const AuthProvider = (props: any) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const value = { session };

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider!");
  }

  return context;
};
