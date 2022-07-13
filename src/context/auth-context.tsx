import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext<Session | null>(null);

export const AuthProvider = (props: any) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <AuthContext.Provider value={session} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider!");
  }

  return context;
};
