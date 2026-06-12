import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { isAuthorized } from "@/lib/api-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES = ["new", "reviewing", "accepted", "passed"] as const;
type Status = (typeof STATUSES)[number];

const SELECT =
  "id, created_at, name, email, phone, whatnot, socials, audience, categories, schedule, why, status, notes, pulled_at";

/**
 * GET /api/applications/:id
 *
 * Read one application on demand. This is how MagicOS fetches PII when it needs
 * to display it, without ever storing the PII in its own database.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("applications")
      .select(SELECT)
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true, application: data });
  } catch (err) {
    console.error("[api/applications/:id] get failed:", err);
    return Response.json(
      { ok: false, error: "Failed to fetch application." },
      { status: 500 }
    );
  }
}

type PatchBody = {
  pulled?: unknown;
  status?: unknown;
  notes?: unknown;
};

/**
 * PATCH /api/applications/:id
 *
 * MagicOS marks an application as pulled (so it isn't imported twice) and/or
 * advances the review status / writes notes. Body (any subset):
 *   { "pulled": true }                         // sets pulled_at = now()
 *   { "pulled": false }                        // clears pulled_at
 *   { "status": "accepted" }                   // new|reviewing|accepted|passed
 *   { "notes": "Reached out 6/11, awaiting reply" }
 *
 * This is the ONLY way MagicOS writes to Breaking Magic — it never touches the
 * database directly.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const update: Record<string, unknown> = {};

  if (body.pulled !== undefined) {
    if (typeof body.pulled !== "boolean") {
      return Response.json(
        { ok: false, error: "`pulled` must be a boolean." },
        { status: 422 }
      );
    }
    update.pulled_at = body.pulled ? new Date().toISOString() : null;
  }

  if (body.status !== undefined) {
    if (
      typeof body.status !== "string" ||
      !(STATUSES as readonly string[]).includes(body.status)
    ) {
      return Response.json(
        { ok: false, error: `\`status\` must be one of: ${STATUSES.join(", ")}.` },
        { status: 422 }
      );
    }
    update.status = body.status as Status;
  }

  if (body.notes !== undefined) {
    if (typeof body.notes !== "string") {
      return Response.json(
        { ok: false, error: "`notes` must be a string." },
        { status: 422 }
      );
    }
    update.notes = body.notes.trim();
  }

  if (Object.keys(update).length === 0) {
    return Response.json(
      { ok: false, error: "Provide at least one of: pulled, status, notes." },
      { status: 422 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("applications")
      .update(update)
      .eq("id", id)
      .select(SELECT)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true, application: data });
  } catch (err) {
    console.error("[api/applications/:id] patch failed:", err);
    return Response.json(
      { ok: false, error: "Failed to update application." },
      { status: 500 }
    );
  }
}
