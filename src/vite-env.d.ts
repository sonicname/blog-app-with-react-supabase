/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    VITE_SUPBASE_URL: string;
    VITE_SUPABASE_KEY: string;
    VITE_TINY_MCE: string;
  };
}
