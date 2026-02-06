import { createClient } from "@supabase/supabase-js";

import { getPublicEnv } from "@/lib/env";

export function getSupabaseClient() {
  const { env, error } = getPublicEnv();

  if (error || !env) {
    return {
      supabase: null,
      error: error ?? "Missing Supabase env.",
    } as const;
  }

  return {
    supabase: createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
    error: null,
  };
}

