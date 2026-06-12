import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { SITE_NAME } from "@/lib/site";

// Supabase's service-role client needs the Node runtime (not edge).
export const runtime = "nodejs";
// Never cache an intake endpoint.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = 4000; // generous per-field ceiling; rejects pasted garbage / abuse

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  whatnot?: unknown;
  socials?: unknown;
  audience?: unknown;
  categories?: unknown;
  schedule?: unknown;
  why?: unknown;
  // Honeypot: a hidden field real users never fill. Bots do.
  company?: unknown;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — if filled, silently accept without storing so bots get no signal.
  if (str(body.company)) {
    return Response.json({ ok: true });
  }

  const application = {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone) || null,
    whatnot: str(body.whatnot),
    socials: str(body.socials) || null,
    audience: str(body.audience),
    categories: Array.isArray(body.categories)
      ? body.categories.map(str).filter(Boolean)
      : [],
    schedule: str(body.schedule),
    why: str(body.why),
    source: "website",
  };

  // Server-side validation — the browser's checks can be bypassed, these can't.
  const fieldErrors: Record<string, string> = {};
  if (!application.name) fieldErrors.name = "Name is required.";
  if (!application.email || !EMAIL_RE.test(application.email))
    fieldErrors.email = "A valid email is required.";
  if (!application.whatnot) fieldErrors.whatnot = "Whatnot username is required.";
  if (!application.audience) fieldErrors.audience = "Audience is required.";
  if (application.categories.length === 0)
    fieldErrors.categories = "Pick at least one category.";
  if (!application.schedule) fieldErrors.schedule = "Schedule is required.";
  if (!application.why) fieldErrors.why = "Tell us why.";

  const tooLong = [
    application.name,
    application.email,
    application.phone,
    application.whatnot,
    application.socials,
    application.audience,
    application.schedule,
    application.why,
  ].some((v) => v && v.length > MAX);
  if (tooLong) fieldErrors.form = "One of your answers is too long.";

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json({ ok: false, fieldErrors }, { status: 422 });
  }

  // 1) Store it — this is the part that matters. If it fails, the user is told.
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("applications").insert(application);
    if (error) throw error;
  } catch (err) {
    console.error("[apply] failed to store application:", err);
    return Response.json(
      { ok: false, error: "Could not save your application. Please try again." },
      { status: 500 }
    );
  }

  // 2) Notify by email — best-effort. A failure here must NOT fail the request,
  //    because the application is already safely stored.
  await notify(application).catch((err) =>
    console.error("[apply] notification email failed:", err)
  );

  return Response.json({ ok: true });
}

async function notify(application: {
  name: string;
  email: string;
  phone: string | null;
  whatnot: string;
  socials: string | null;
  audience: string;
  categories: string[];
  schedule: string;
  why: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPLICATIONS_NOTIFY_EMAIL;
  // From must be on a domain you've verified in Resend. For first-run testing,
  // Resend's shared sender works without any domain setup.
  const from = process.env.APPLICATIONS_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.warn(
      "[apply] email notification skipped — set RESEND_API_KEY and APPLICATIONS_NOTIFY_EMAIL to enable it."
    );
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const rows: Array<[string, string]> = [
    ["Name", application.name],
    ["Email", application.email],
    ["Phone", application.phone || "—"],
    ["Whatnot", application.whatnot],
    ["Other socials", application.socials || "—"],
    ["Audience", application.audience],
    ["Categories", application.categories.join(", ")],
    ["Schedule", application.schedule],
    ["Why", application.why],
  ];

  const html = `
    <h2>New ${SITE_NAME} application</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="vertical-align:top;font-weight:bold">${label}</td><td>${escapeHtml(
              value
            )}</td></tr>`
        )
        .join("")}
    </table>
  `;

  await resend.emails.send({
    from: `${SITE_NAME} <${from}>`,
    to: [to],
    replyTo: application.email,
    subject: `New application: ${application.name} (${application.whatnot})`,
    html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
