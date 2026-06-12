# MagicOS ↔ Breaking Magic — applications integration

How MagicOS pulls streamer applications into its **Streamer Management →
Onboarding** section.

## Architecture (and why it's shaped this way)

```
Applicant ─► breakingmagic.com /apply ─► POST /api/apply ─► Breaking Magic Supabase
                                                                  │  (applications table)
MagicOS (server) ──HTTPS + shared secret──► breakingmagic.com /api/applications
                                                                  ▲
                                          the website is the ONLY thing that
                                          touches the Breaking Magic database
```

- **MagicOS never gets Breaking Magic database credentials.** It holds one
  bearer token for one set of HTTP endpoints. If it leaks, the blast radius is
  read access to applications — not the database.
- **PII stays in Breaking Magic.** MagicOS stores only the application `id` plus
  its own onboarding state, and fetches name/email/phone on demand. One copy of
  the personal data → one place to delete it.
- **Breaking Magic owns all writes.** MagicOS advances status / marks pulled via
  `PATCH`; it never writes to the DB directly.

## Setup

1. **Generate a shared secret** and set it as `MAGICOS_API_TOKEN` in *both*
   apps' environments (Breaking Magic website **and** MagicOS):
   ```bash
   openssl rand -base64 32
   ```
2. In MagicOS, configure:
   ```
   BREAKING_MAGIC_API_URL="https://breakingmagic.com"   # or your dev URL
   BREAKING_MAGIC_API_TOKEN="<the same secret>"
   ```
3. Call the endpoints **only from MagicOS's server** (never the browser — the
   token must not ship to clients). No CORS is configured, by design.

## Endpoints

All requests require: `Authorization: Bearer <MAGICOS_API_TOKEN>`.

### `GET /api/applications` — the onboarding inbox

Returns applications MagicOS hasn't pulled yet, oldest first.

| Query param     | Default | Notes                                              |
| --------------- | ------- | -------------------------------------------------- |
| `limit`         | 50      | 1–200                                              |
| `offset`        | 0       | for paging                                         |
| `status`        | —       | `new` \| `reviewing` \| `accepted` \| `passed`     |
| `includePulled` | false   | `true` also returns already-pulled applications    |

```json
{
  "ok": true,
  "count": 12,
  "limit": 50,
  "offset": 0,
  "applications": [
    {
      "id": "9b1c…",
      "created_at": "2026-06-11T15:04:00Z",
      "name": "Jordan Lee",
      "email": "jordan@example.com",
      "phone": null,
      "whatnot": "jlee_breaks",
      "socials": "tiktok.com/@jleebreaks",
      "audience": "~2,400 followers, ~60 live viewers",
      "categories": ["Pokémon", "Sports"],
      "schedule": "weeknights + Saturday",
      "why": "…",
      "status": "new",
      "notes": null,
      "pulled_at": null
    }
  ]
}
```

### `GET /api/applications/:id` — read one on demand

Use this when rendering an onboarding record to fetch current PII, instead of
storing it in MagicOS. Returns `{ ok: true, application: {...} }` or `404`.

### `PATCH /api/applications/:id` — mark pulled / update status

Body — any subset:

```json
{ "pulled": true }                  // sets pulled_at = now() so it leaves the inbox
{ "status": "accepted" }            // new | reviewing | accepted | passed
{ "notes": "Reached out 6/11" }
```

Returns the updated `{ ok: true, application: {...} }`.

## Recommended pull loop (paste into MagicOS, server-side)

```ts
// magicos: lib/breakingMagic.ts
const BASE = process.env.BREAKING_MAGIC_API_URL!;
const TOKEN = process.env.BREAKING_MAGIC_API_TOKEN!;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export async function fetchNewApplications() {
  const res = await fetch(`${BASE}/api/applications?limit=100`, { headers });
  if (!res.ok) throw new Error(`Breaking Magic API ${res.status}`);
  const { applications } = await res.json();
  return applications as Array<{ id: string; name: string; whatnot: string /* … */ }>;
}

export async function getApplication(id: string) {
  const res = await fetch(`${BASE}/api/applications/${id}`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Breaking Magic API ${res.status}`);
  return (await res.json()).application;
}

export async function markPulled(id: string, status?: string) {
  const res = await fetch(`${BASE}/api/applications/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ pulled: true, ...(status ? { status } : {}) }),
  });
  if (!res.ok) throw new Error(`Breaking Magic API ${res.status}`);
  return (await res.json()).application;
}
```

### Onboarding flow

1. `fetchNewApplications()` to populate the onboarding inbox.
2. When a streamer is taken into onboarding, create a MagicOS onboarding record
   storing **only** `breaking_magic_application_id` (+ your own onboarding
   fields), then call `markPulled(id, "reviewing")` so it leaves the inbox and
   isn't imported twice.
3. Whenever you need to show contact details, call `getApplication(id)` — don't
   persist the PII in MagicOS.
4. As onboarding progresses, `PATCH` `status` (e.g. `accepted`) so the Breaking
   Magic side stays in sync.

## Data protection notes

- Rotate `MAGICOS_API_TOKEN` to instantly cut MagicOS off.
- Every pull is an HTTP request you can log for accountability.
- Because PII isn't copied, a deletion / erasure request is handled in Breaking
  Magic alone.
