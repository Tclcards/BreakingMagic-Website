import "server-only";
import { timingSafeEqual } from "node:crypto";

/*
  Shared-secret auth for the machine-to-machine /api/applications endpoints.

  MagicOS sends:  Authorization: Bearer <MAGICOS_API_TOKEN>
  The same secret lives in this app's env and in MagicOS's env. Rotating it
  here instantly revokes MagicOS's access — no database credentials are shared.

  Fail-closed: if MAGICOS_API_TOKEN isn't set, every request is rejected.
*/
export function isAuthorized(request: Request): boolean {
  const expected = process.env.MAGICOS_API_TOKEN;
  if (!expected) return false;

  const header = request.headers.get("authorization") ?? "";
  const prefix = "Bearer ";
  if (!header.startsWith(prefix)) return false;

  const provided = header.slice(prefix.length);

  // Constant-time compare to avoid leaking the token via timing. timingSafeEqual
  // requires equal-length buffers, so bail early on a length mismatch.
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
