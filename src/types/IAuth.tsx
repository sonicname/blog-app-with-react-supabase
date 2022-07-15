import { Session } from "@supabase/supabase-js";

export interface IAuthValue {
  email: string;
  password: string;
}

export interface IAuthContext {
  session: Session | null;
  signIn: (values: IAuthValue) => Promise<void>;
  signUp: (values: IAuthValue) => Promise<void>;
  signOut: () => Promise<void>;
}
