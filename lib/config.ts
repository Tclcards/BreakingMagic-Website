/*
  ────────────────────────────────────────────────────────────────────────────
  APPLY ENDPOINT

  The Apply page POSTs applications to this same-origin route. The route
  (app/api/apply/route.ts) validates the data, stores it in Supabase, and
  emails a notification.

  Configuration lives in environment variables, not here — see .env.example:
    SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY,
    APPLICATIONS_NOTIFY_EMAIL, APPLICATIONS_FROM_EMAIL.
  ────────────────────────────────────────────────────────────────────────────
*/
export const APPLY_ENDPOINT = "/api/apply";
