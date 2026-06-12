import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Server-only Supabase client built from the SERVICE ROLE key.

  This key bypasses Row Level Security, so it must NEVER reach the browser.
  The `server-only` import above makes the build fail if this file is ever
  imported into a Client Component — a guardrail, not just a convention.

  Created lazily so a missing env var surfaces as a clear runtime error in the
  one route that uses it, rather than crashing the whole app at startup.
*/
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and " +
        "SUPABASE_SERVICE_ROLE_KEY in your environment (see .env.example)."
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
