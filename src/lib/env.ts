import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export type PublicEnv = z.infer<typeof envSchema>;

export function getPublicEnv():
  | { env: PublicEnv; error: null }
  | { env: null; error: string } {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n");

    return {
      env: null,
      error:
        `Invalid environment variables:\n${issues}\n\n` +
        `Create a .env.local file (see .env.local.example).`,
    };
  }

  return { env: parsed.data, error: null };
}

