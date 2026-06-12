-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: MagicOS onboarding access
--
-- Run this in your Breaking Magic Supabase project's SQL Editor if you already
-- ran schema.sql before this column existed. (schema.sql now includes it too,
-- so a brand-new project doesn't need this file.)
--
-- `pulled_at` marks when MagicOS imported an application into its onboarding
-- flow. It is intentionally SEPARATE from `status` (the human review pipeline):
--   • status     → set by you while reviewing (new/reviewing/accepted/passed)
--   • pulled_at   → set by MagicOS so it never imports the same application twice
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.applications
  add column if not exists pulled_at timestamptz;

-- Partial index makes "the onboarding inbox" query (unpulled, oldest first) fast.
create index if not exists applications_unpulled_idx
  on public.applications (created_at)
  where pulled_at is null;
