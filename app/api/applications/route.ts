import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { isAuthorized } from "@/lib/api-auth";

// Service-role Supabase + node crypto need the Node runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;
const STATUSES = ["new", "reviewing", "accepted", "passed"] as const;

// Columns MagicOS may read. PII is included so MagicOS can display it on demand,
// but MagicOS is expected to STORE only the id (see docs/magicos-integration.md).
const SELECT =
  "id, created_at, name, email, phone, whatnot, socials, audience, categories, schedule, why, status, notes, pulled_at";

/**
 * GET /api/applications
 *
 * The onboarding inbox: applications MagicOS hasn't pulled yet, oldest first.
 *
 * Query params:
 *   limit         1..200 (default 50)
 *   offset        >= 0   (default 0)
 *   status        new | reviewing | accepted | passed   (optional filter)
 *   includePulled "true" to also return already-pulled applications
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const params = new URL(request.url).searchParams;

  const limit = Math.min(
    Math.max(Number(params.get("limit")) || DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );
  const offset = Math.max(Number(params.get("offset")) || 0, 0);
  const includePulled = params.get("includePulled") === "true";
  const status = params.get("status");

  try {
    const supabase = getSupabaseAdmin();
    let query = supabase
      .from("applications")
      .select(SELECT, { count: "exact" })
      .order("created_at", { ascending: true })
      .range(offset, offset + limit - 1);

    if (!includePulled) query = query.is("pulled_at", null);
    if (status && (STATUSES as readonly string[]).includes(status)) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return Response.json({
      ok: true,
      count: count ?? data?.length ?? 0,
      limit,
      offset,
      applications: data ?? [],
    });
  } catch (err) {
    console.error("[api/applications] list failed:", err);
    return Response.json(
      { ok: false, error: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}
