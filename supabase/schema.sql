-- ─────────────────────────────────────────────────────────────────────────────
-- Breaking Magic — "Apply to Stream" storage
--
-- Run this once in your NEW Supabase project:
--   Supabase dashboard → SQL Editor → New query → paste this → Run.
--
-- Then grab your keys from: Project Settings → API
--   • Project URL              → SUPABASE_URL
--   • service_role secret key  → SUPABASE_SERVICE_ROLE_KEY   (server-only!)
-- and put them in .env.local (see .env.example).
-- ─────────────────────────────────────────────────────────────────────────────

create table public.applications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- From the form
  name        text not null,
  email       text not null,
  phone       text,
  whatnot     text not null,
  socials     text,
  audience    text not null,
  categories  text[] not null default '{}',
  schedule    text not null,
  why         text not null,

  -- Your review pipeline — this is what makes the data usable later.
  status      text not null default 'new'
                check (status in ('new', 'reviewing', 'accepted', 'passed')),
  notes       text,

  -- Set by MagicOS (via the /api/applications API) when it imports an
  -- application into onboarding, so it's never pulled twice. Separate from
  -- `status`, which is your human review pipeline.
  pulled_at   timestamptz,

  source      text not null default 'website'
);

-- Handy for "show me the newest applications I haven't reviewed."
create index applications_status_created_idx
  on public.applications (status, created_at desc);

-- The MagicOS "onboarding inbox" query: unpulled applications, oldest first.
create index applications_unpulled_idx
  on public.applications (created_at)
  where pulled_at is null;

-- Lock the table down. RLS is ON with NO public policies, so the anon/public
-- key (the one your other app uses in the browser) can neither read nor write
-- this table. The /api/apply route uses the service_role key, which bypasses
-- RLS — that's the only thing that can touch this data.
alter table public.applications enable row level security;
